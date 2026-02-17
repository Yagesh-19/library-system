<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('librarian')->name('librarian.')->group(function () {
        Route::get('dashboard', fn () => Inertia::render('librarian/dashboard'))->name('dashboard');
        Route::get('books', fn () => Inertia::render('librarian/books'))->name('books');
        Route::get('members', fn () => Inertia::render('librarian/members'))->name('members');
        Route::get('transactions', fn () => Inertia::render('librarian/transactions'))->name('transactions');
        Route::get('reports', fn () => Inertia::render('librarian/reports'))->name('reports');
    });

    Route::prefix('student')->name('student.')->group(function () {
        Route::get('dashboard', fn () => Inertia::render('student/dashboard'))->name('dashboard');
        Route::get('search', fn () => Inertia::render('student/search'))->name('search');
        Route::get('borrowing', fn () => Inertia::render('student/borrowing'))->name('borrowing');
        Route::get('profile', fn () => Inertia::render('student/profile'))->name('profile');
    });

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', fn () => Inertia::render('admin/dashboard'))->name('dashboard');
        Route::get('users', fn () => Inertia::render('admin/users'))->name('users');
        Route::get('system', fn () => Inertia::render('admin/system'))->name('system');
        Route::get('reports', fn () => Inertia::render('admin/reports'))->name('reports');
        Route::get('security', fn () => Inertia::render('admin/security'))->name('security');
    });
});

require __DIR__.'/settings.php';
