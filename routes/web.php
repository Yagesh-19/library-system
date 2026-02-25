<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Enums\UserRole;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Student\BorrowingController;
use App\Http\Controllers\Student\BorrowingRenewController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\ProfileUpdateController;
use App\Http\Controllers\Student\ReservationController;
use App\Http\Controllers\Student\SearchController;
use App\Http\Controllers\Librarian\BooksController as LibrarianBooksController;
use App\Http\Controllers\Librarian\DashboardController as LibrarianDashboardController;
use App\Http\Controllers\Librarian\MembersController as LibrarianMembersController;
use App\Http\Controllers\Librarian\TransactionsController as LibrarianTransactionsController;
use App\Http\Controllers\Librarian\ReportsController as LibrarianReportsController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UsersController as AdminUsersController;
use App\Http\Controllers\Admin\SystemController as AdminSystemController;
use App\Http\Controllers\Admin\ReportsController as AdminReportsController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('register/student', fn () => Inertia::render('auth/register-student'))->name('register.student');
    Route::get('register/librarian', fn () => Inertia::render('auth/register-librarian'))->name('register.librarian');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function (Request $request) {
        if ($request->user()->role === UserRole::Admin) {
            return redirect()->route('admin.dashboard');
        } elseif ($request->user()->role === UserRole::Librarian) {
            return redirect()->route('librarian.dashboard');
        } elseif ($request->user()->role === UserRole::Student) {
            return redirect()->route('student.dashboard');
        }
        abort(403);
        
    })->name('dashboard');

    Route::prefix('librarian')->name('librarian.')->middleware(['role:librarian', 'banned'])->group(function () {
        Route::get('dashboard', LibrarianDashboardController::class)->name('dashboard');
        Route::get('books', [LibrarianBooksController::class, 'index'])->name('books');
        Route::post('books', [LibrarianBooksController::class, 'store'])->name('books.store');
        Route::patch('books/{book}', [LibrarianBooksController::class, 'update'])->name('books.update');
        Route::patch('books/{book}/stock', [LibrarianBooksController::class, 'updateStock'])->name('books.stock');
        Route::delete('books/{book}', [LibrarianBooksController::class, 'destroy'])->name('books.destroy');
        Route::get('members', [LibrarianMembersController::class, 'index'])->name('members');
        Route::post('members', [LibrarianMembersController::class, 'store'])->name('members.store');
        Route::patch('members/{student}', [LibrarianMembersController::class, 'updateStatus'])->name('members.update');
        Route::get('transactions', [LibrarianTransactionsController::class, 'index'])->name('transactions');
        Route::post('transactions/issue', [LibrarianTransactionsController::class, 'issue'])->name('transactions.issue');
        Route::post('transactions/return', [LibrarianTransactionsController::class, 'return'])->name('transactions.return');
        Route::post('transactions/renew', [LibrarianTransactionsController::class, 'renew'])->name('transactions.renew');
        Route::patch('reservations/{reservation}/approve', [LibrarianTransactionsController::class, 'approveReservation'])->name('reservations.approve');
        Route::get('reports', [LibrarianReportsController::class, 'index'])->name('reports');
    });

    Route::prefix('student')->name('student.')->middleware(['role:student', 'banned'])->group(function () {
        Route::get('dashboard', StudentDashboardController::class)->name('dashboard');
        Route::get('search', SearchController::class)->name('search');
        Route::get('borrowing', BorrowingController::class)->name('borrowing');
        Route::get('profile', ProfileController::class)->name('profile');
        Route::post('reservations', [ReservationController::class, 'store'])->name('reservations.store');
        Route::patch('reservations/{reservation}', [ReservationController::class, 'update'])->name('reservations.update');
        Route::post('borrowings/{borrowing}/renew', BorrowingRenewController::class)->name('borrowings.renew');
        Route::patch('profile', ProfileUpdateController::class)->name('profile.update');
    });

    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::get('dashboard', AdminDashboardController::class)->name('dashboard');
        Route::get('users', [AdminUsersController::class, 'index'])->name('users');
        Route::post('users', [AdminUsersController::class, 'store'])->name('users.store');
        Route::patch('users/{user}/approve', [AdminUsersController::class, 'approve'])->name('users.approve');
        Route::patch('users/{user}/status', [AdminUsersController::class, 'updateStatus'])->name('users.status');
        Route::get('system', [AdminSystemController::class, 'index'])->name('system');
        Route::post('system/categories', [AdminSystemController::class, 'storeCategory'])->name('system.categories.store');
        Route::delete('system/categories/{category}', [AdminSystemController::class, 'deleteCategory'])->name('system.categories.delete');
        Route::patch('system/borrowing-rules', [AdminSystemController::class, 'updateRules'])->name('system.rules');
        Route::patch('system/settings', [AdminSystemController::class, 'updateSettings'])->name('system.settings');
        Route::get('reports', [AdminReportsController::class, 'index'])->name('reports');
        Route::post('reports/export', [AdminReportsController::class, 'export'])->name('reports.export');
    });
});

require __DIR__.'/settings.php';
