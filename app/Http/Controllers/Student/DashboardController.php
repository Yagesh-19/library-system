<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\LibraryNotification;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $user = request()->user();

        $activeBorrowings = Borrowing::query()
            ->with('book')
            ->where('user_id', $user->id)
            ->whereIn('status', ['borrowed', 'overdue'])
            ->orderBy('due_at')
            ->get();

        $dueSoonCount = $activeBorrowings
            ->filter(fn (Borrowing $borrowing) => $borrowing->due_at->between(now(), now()->addDays(7)))
            ->count();

        $notifications = LibraryNotification::query()
            ->where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (LibraryNotification $note) => [
                'id' => $note->id,
                'title' => $note->title,
                'time' => $note->created_at->diffForHumans(),
                'read_at' => $note->read_at,
            ]);

        $popularBooks = Book::query()
            ->withCount('borrowings')
            ->orderByDesc('borrowings_count')
            ->take(3)
            ->get()
            ->map(fn (Book $book) => [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'tag' => $book->available_copies > 0 ? 'Available' : 'Reserved',
            ]);

        return Inertia::render('student/dashboard', [
            'stats' => [
                'borrowed' => $activeBorrowings->count(),
                'dueSoon' => $dueSoonCount,
                'fines' => '0.00',
            ],
            'notifications' => $notifications,
            'recommendations' => $popularBooks,
        ]);
    }
}
