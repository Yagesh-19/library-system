<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Student\BorrowingController;
use App\Http\Controllers\Student\BorrowingRenewController;
use App\Http\Controllers\Student\DashboardController as StudentDashboardController;
use App\Http\Controllers\Student\ProfileController;
use App\Http\Controllers\Student\ProfileUpdateController;
use App\Http\Controllers\Student\ReservationController;
use App\Http\Controllers\Student\SearchController;

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
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('librarian')->name('librarian.')->middleware('role:librarian')->group(function () {
        Route::get('dashboard', fn () => Inertia::render('librarian/dashboard'))->name('dashboard');
        Route::get('books', fn () => Inertia::render('librarian/books'))->name('books');
        Route::get('members', fn () => Inertia::render('librarian/members'))->name('members');
        Route::get('transactions', fn () => Inertia::render('librarian/transactions'))->name('transactions');
        Route::get('reports', fn () => Inertia::render('librarian/reports'))->name('reports');
    });

    Route::prefix('student')->name('student.')->middleware('role:student')->group(function () {
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
        Route::get('dashboard', fn () => Inertia::render('admin/dashboard'))->name('dashboard');
        Route::get('users', fn () => Inertia::render('admin/users'))->name('users');
        Route::get('system', fn () => Inertia::render('admin/system'))->name('system');
        Route::get('reports', fn () => Inertia::render('admin/reports'))->name('reports');
        Route::get('security', fn () => Inertia::render('admin/security'))->name('security');
    });
});

require __DIR__.'/settings.php';
