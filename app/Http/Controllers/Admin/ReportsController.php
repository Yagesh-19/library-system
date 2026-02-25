<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Borrowing;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function index()
    {
        $reports = [
            ['title' => 'Most Borrowed Books', 'metric' => 'Top 10 list', 'action' => 'Generate'],
            ['title' => 'Overdue Items', 'metric' => Borrowing::where('status', 'overdue')->count().' active cases', 'action' => 'Review'],
        ];

        $analytics = [
            ['label' => 'Daily Active Users', 'value' => '72%'],
            ['label' => 'Borrowing Completion', 'value' => '64%'],
            ['label' => 'Reservation Conversion', 'value' => '38%'],
        ];

        return Inertia::render('admin/reports', [
            'reports' => $reports,
            'analytics' => $analytics,
        ]);
    }

    public function export(Request $request): StreamedResponse
    {
        $rows = Book::query()
            ->withCount('borrowings')
            ->orderByDesc('borrowings_count')
            ->take(10)
            ->get();

        $response = new StreamedResponse(function () use ($rows) {
            $handle = fopen('php://output', 'wb');
            fputcsv($handle, ['Title', 'Author', 'Borrow Count']);
            foreach ($rows as $book) {
                fputcsv($handle, [$book->title, $book->author, $book->borrowings_count]);
            }
            fclose($handle);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment; filename="most-borrowed.csv"');

        return $response;
    }
}
