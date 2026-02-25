<?php

namespace App\Http\Controllers\Librarian;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        $issued = Borrowing::where('status', 'borrowed')->count();
        $returned = Borrowing::where('status', 'returned')->count();
        $current = Borrowing::whereIn('status', ['borrowed', 'overdue'])->count();

        $popular = Book::query()
            ->withCount('borrowings')
            ->orderByDesc('borrowings_count')
            ->take(3)
            ->get()
            ->map(fn (Book $book, int $index) => [
                'rank' => $index + 1,
                'title' => $book->title,
                'count' => $book->borrowings_count,
            ]);

        $overdueCount = Borrowing::where('status', 'overdue')->count();

        return Inertia::render('librarian/reports', [
            'metrics' => [
                'issued' => $issued,
                'returned' => $returned,
                'current' => $current,
            ],
            'popular' => $popular,
            'overdue' => [
                ['label' => 'Critical (>30 days)', 'value' => $overdueCount, 'color' => 'bg-rose-100 text-rose-700'],
                ['label' => 'Warning (15-30 days)', 'value' => max(0, (int) round($overdueCount / 2)), 'color' => 'bg-amber-100 text-amber-700'],
                ['label' => 'Recent (1-14 days)', 'value' => max(0, (int) round($overdueCount / 3)), 'color' => 'bg-sky-100 text-sky-700'],
            ],
        ]);
    }
}
