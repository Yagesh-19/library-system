<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __invoke()
    {
        $user = request()->user();

        $history = Borrowing::query()
            ->with('book')
            ->where('user_id', $user->id)
            ->orderByDesc('borrowed_at')
            ->take(8)
            ->get()
            ->map(fn (Borrowing $borrowing) => [
                'id' => $borrowing->id,
                'title' => $borrowing->book?->title ?? 'Unknown',
                'action' => $borrowing->status === 'returned' ? 'Returned' : 'Borrowed',
                'date' => optional($borrowing->borrowed_at)->format('M j, Y'),
            ]);

        return Inertia::render('student/profile', [
            'profile' => [
                'name' => $user->name,
                'email' => $user->email,
                'studentNumber' => $user->student?->student_number,
            ],
            'history' => $history,
        ]);
    }
}
