<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Borrowing;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $totalUsers = User::count();
        $pendingApprovals = User::whereNull('approved_at')->whereIn('role', ['student', 'librarian'])->count();
        $activeLoans = Borrowing::whereIn('status', ['borrowed', 'overdue'])->count();

        $alerts = collect();
        if ($pendingApprovals > 0) {
            $alerts->push([
                'title' => 'Pending user approvals require attention',
                'time' => now()->diffForHumans(),
            ]);
        }

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalUsers' => $totalUsers,
                'pendingApprovals' => $pendingApprovals,
                'activeLoans' => $activeLoans,
            ],
            'alerts' => $alerts,
            'usage' => [
                ['label' => 'Borrowing requests', 'value' => '70%'],
                ['label' => 'Catalog searches', 'value' => '55%'],
                ['label' => 'New registrations', 'value' => '30%'],
            ],
        ]);
    }
}
