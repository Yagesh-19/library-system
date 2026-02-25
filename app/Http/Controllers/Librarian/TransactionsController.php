<?php

namespace App\Http\Controllers\Librarian;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\BorrowingRule;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class TransactionsController extends Controller
{
    public function index(Request $request)
    {
        $query = Borrowing::query()->with(['book', 'user']);

        if ($from = $request->date('from')) {
            $query->whereDate('borrowed_at', '>=', $from);
        }

        if ($to = $request->date('to')) {
            $query->whereDate('borrowed_at', '<=', $to);
        }

        $transactions = $query
            ->latest('borrowed_at')
            ->take(50)
            ->get()
            ->map(fn (Borrowing $borrowing) => [
                'id' => $borrowing->id,
                'member' => $borrowing->user?->name ?? 'Unknown',
                'book' => $borrowing->book?->title ?? 'Unknown',
                'type' => $borrowing->returned_at ? 'Return' : 'Issue',
                'date' => optional($borrowing->borrowed_at)->format('M j, Y'),
                'due' => optional($borrowing->due_at)->format('M j, Y'),
                'status' => $borrowing->status,
            ]);

        $pendingReservations = Reservation::query()
            ->with(['book', 'user'])
            ->where('status', 'active')
            ->latest('reserved_at')
            ->take(8)
            ->get()
            ->map(fn (Reservation $reservation) => [
                'id' => $reservation->id,
                'member' => $reservation->user?->name ?? 'Unknown',
                'book' => $reservation->book?->title ?? 'Unknown',
                'reserved_at' => $reservation->reserved_at?->diffForHumans(),
            ]);

        return Inertia::render('librarian/transactions', [
            'filters' => [
                'from' => $request->string('from')->toString(),
                'to' => $request->string('to')->toString(),
            ],
            'transactions' => $transactions,
            'reservations' => $pendingReservations,
        ]);
    }

    public function issue(Request $request)
    {
        $data = $request->validate([
            'member_id' => ['required', 'integer', 'exists:users,id'],
            'isbn' => ['required', 'string', 'exists:books,isbn'],
            'due_at' => ['required', 'date'],
        ]);

        $book = Book::where('isbn', $data['isbn'])->firstOrFail();

        if ($book->available_copies < 1) {
            return back()->withErrors(['isbn' => 'No copies available.']);
        }

        Borrowing::create([
            'user_id' => $data['member_id'],
            'book_id' => $book->id,
            'borrowed_at' => now(),
            'due_at' => $data['due_at'],
            'status' => 'borrowed',
        ]);

        $book->decrement('available_copies');

        return back()->with('status', 'Book issued.');
    }

    public function return(Request $request)
    {
        $data = $request->validate([
            'transaction_id' => ['required', 'integer', 'exists:borrowings,id'],
        ]);

        $borrowing = Borrowing::findOrFail($data['transaction_id']);

        if ($borrowing->returned_at) {
            return back()->withErrors(['transaction_id' => 'Already returned.']);
        }

        $borrowing->update([
            'returned_at' => now(),
            'status' => 'returned',
        ]);

        $borrowing->book?->increment('available_copies');

        return back()->with('status', 'Book returned.');
    }

    public function renew(Request $request)
    {
        $data = $request->validate([
            'transaction_id' => ['required', 'integer', 'exists:borrowings,id'],
        ]);

        $borrowing = Borrowing::findOrFail($data['transaction_id']);

        if ($borrowing->status !== 'borrowed') {
            return back()->withErrors(['transaction_id' => 'Cannot renew this transaction.']);
        }

        $borrowing->update([
            'due_at' => $borrowing->due_at->addDays(14),
        ]);

        return back()->with('status', 'Borrowing renewed.');
    }

    public function approveReservation(Request $request, Reservation $reservation)
    {
        DB::transaction(function () use ($reservation) {
            $reservation = Reservation::query()->lockForUpdate()->findOrFail($reservation->id);

            if ($reservation->status !== 'active') {
                throw ValidationException::withMessages([
                    'reservation' => 'Only active reservations can be approved.',
                ]);
            }

            $rules = BorrowingRule::first();
            $borrowDays = $rules?->borrow_days ?? 14;

            Borrowing::create([
                'user_id' => $reservation->user_id,
                'book_id' => $reservation->book_id,
                'borrowed_at' => now(),
                'due_at' => now()->addDays($borrowDays),
                'status' => 'borrowed',
            ]);

            $reservation->update([
                'status' => 'fulfilled',
                'fulfilled_at' => now(),
            ]);
        });

        return back()->with('status', 'Reservation approved.');
    }
}
