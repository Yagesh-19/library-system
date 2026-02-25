<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ReservationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
        ]);

        DB::transaction(function () use ($request, $data) {
            $book = Book::query()->lockForUpdate()->findOrFail($data['book_id']);

            if ($book->available_copies < 1) {
                throw ValidationException::withMessages([
                    'book_id' => 'No copies available for reservation.',
                ]);
            }

            $hasActiveReservation = Reservation::query()
                ->where('user_id', $request->user()->id)
                ->where('book_id', $book->id)
                ->where('status', 'active')
                ->exists();

            if ($hasActiveReservation) {
                throw ValidationException::withMessages([
                    'book_id' => 'You already have an active reservation for this book.',
                ]);
            }

            Reservation::create([
                'user_id' => $request->user()->id,
                'book_id' => $book->id,
                'reserved_at' => now(),
                'expires_at' => now()->addDays(3),
                'status' => 'active',
            ]);

            $book->decrement('available_copies');
        });

        return back()->with('status', 'Reservation created.');
    }

    public function update(Request $request, Reservation $reservation): RedirectResponse
    {
        $request->validate([
            'action' => ['required', 'in:cancel'],
        ]);

        if ($reservation->user_id !== $request->user()->id) {
            abort(403);
        }

        DB::transaction(function () use ($reservation) {
            $reservation = Reservation::query()->lockForUpdate()->findOrFail($reservation->id);

            if ($reservation->status !== 'active') {
                throw ValidationException::withMessages([
                    'action' => 'Only active reservations can be cancelled.',
                ]);
            }

            $reservation->update([
                'status' => 'cancelled',
            ]);

            $book = Book::query()->lockForUpdate()->findOrFail($reservation->book_id);
            $book->update([
                'available_copies' => min($book->available_copies + 1, $book->total_copies),
            ]);
        });

        return back()->with('status', 'Reservation updated.');
    }
}
