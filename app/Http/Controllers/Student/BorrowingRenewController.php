<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class BorrowingRenewController extends Controller
{
    public function __invoke(Request $request, Borrowing $borrowing): RedirectResponse
    {
        if ($borrowing->user_id !== $request->user()->id) {
            abort(403);
        }

        if ($borrowing->status !== 'borrowed') {
            return back()->with('status', 'Unable to renew this item.');
        }

        $borrowing->update([
            'due_at' => $borrowing->due_at->addDays(14),
        ]);

        return back()->with('status', 'Borrowing renewed.');
    }
}
