<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\Reservation;
use Inertia\Inertia;

class BorrowingController extends Controller
{
    public function __invoke()
    {
        $user = request()->user();

        $borrowed = Borrowing::query()
            ->with('book')
            ->where('user_id', $user->id)
            ->whereIn('status', ['borrowed', 'overdue'])
            ->orderBy('due_at')
            ->get()
            ->map(fn (Borrowing $borrowing) => [
                'id' => $borrowing->id,
                'title' => $borrowing->book?->title ?? 'Unknown',
                'due' => optional($borrowing->due_at)->format('M j, Y'),
                'status' => $borrowing->status === 'overdue' ? 'Overdue' : 'On track',
            ]);

        $reservations = Reservation::query()
            ->with('book')
            ->where('user_id', $user->id)
            ->orderByDesc('reserved_at')
            ->take(5)
            ->get()
            ->map(fn (Reservation $reservation) => [
                'id' => $reservation->id,
                'title' => $reservation->book?->title ?? 'Unknown',
                'status' => match ($reservation->status) {
                    'fulfilled' => 'Ready for pickup',
                    'cancelled' => 'Cancelled',
                    'expired' => 'Expired',
                    default => 'In queue',
                },
            ]);

        return Inertia::render('student/borrowing', [
            'borrowed' => $borrowed,
            'reservations' => $reservations,
        ]);
    }
}
