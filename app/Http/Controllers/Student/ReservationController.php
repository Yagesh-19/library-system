<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
        ]);

        $book = Book::query()->findOrFail($data['book_id']);

        Reservation::create([
            'user_id' => $request->user()->id,
            'book_id' => $book->id,
            'reserved_at' => now(),
            'expires_at' => now()->addDays(3),
            'status' => 'active',
        ]);

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

        $reservation->update([
            'status' => 'cancelled',
        ]);

        return back()->with('status', 'Reservation updated.');
    }
}
