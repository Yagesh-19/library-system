<?php

namespace App\Http\Controllers\Librarian;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $totalBooks = Book::count();
        $activeMembers = User::where('role', 'student')->where('is_active', true)->count();
        $borrowedBooks = Borrowing::whereIn('status', ['borrowed', 'overdue'])->count();
        $overdueBooks = Borrowing::where('status', 'overdue')->count();

        $transactions = Borrowing::query()
            ->with(['book', 'user'])
            ->latest('borrowed_at')
            ->take(3)
            ->get()
            ->map(function (Borrowing $borrowing) {
                return [
                    'id' => $borrowing->id,
                    'text' => $borrowing->returned_at
                        ? sprintf('%s returned "%s"', $borrowing->user?->name ?? 'Member', $borrowing->book?->title ?? 'Unknown')
                        : sprintf('%s borrowed "%s"', $borrowing->user?->name ?? 'Member', $borrowing->book?->title ?? 'Unknown'),
                    'time' => $borrowing->borrowed_at?->diffForHumans() ?? 'just now',
                    'type' => $borrowing->returned_at ? 'return' : 'issue',
                ];
            });

        $popularBooks = Book::query()
            ->withCount('borrowings')
            ->orderByDesc('borrowings_count')
            ->take(3)
            ->get()
            ->map(function (Book $book, int $index) {
                return [
                    'rank' => $index + 1,
                    'title' => $book->title,
                    'author' => $book->author,
                    'count' => $book->borrowings_count,
                ];
            });

        return Inertia::render('librarian/dashboard', [
            'stats' => [
                'totalBooks' => $totalBooks,
                'activeMembers' => $activeMembers,
                'borrowedBooks' => $borrowedBooks,
                'overdueBooks' => $overdueBooks,
            ],
            'transactions' => $transactions,
            'popular' => $popularBooks,
        ]);
    }
}
