<?php

use App\Enums\UserRole;
use App\Models\Book;
use App\Models\Category;
use App\Models\Borrowing;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function makeUser(UserRole $role): User
{
    return User::factory()->create([
        'role' => $role->value,
        'approved_at' => now(),
        'is_active' => true,
    ]);
}

test('student reservation decrements available copies', function () {
    $student = makeUser(UserRole::Student);
    $book = Book::create([
        'title' => 'Clean Code',
        'author' => 'Robert C. Martin',
        'isbn' => '9780132350884',
        'total_copies' => 2,
        'available_copies' => 2,
    ]);

    $this->actingAs($student)
        ->post(route('student.reservations.store'), ['book_id' => $book->id])
        ->assertRedirect();

    $book->refresh();

    expect($book->available_copies)->toBe(1);
    $this->assertDatabaseHas('reservations', [
        'user_id' => $student->id,
        'book_id' => $book->id,
        'status' => 'active',
    ]);
});

test('student cannot reserve when no copies are available', function () {
    $student = makeUser(UserRole::Student);
    $book = Book::create([
        'title' => 'Domain-Driven Design',
        'author' => 'Eric Evans',
        'isbn' => '9780321125217',
        'total_copies' => 1,
        'available_copies' => 0,
    ]);

    $this->actingAs($student)
        ->post(route('student.reservations.store'), ['book_id' => $book->id])
        ->assertSessionHasErrors('book_id');

    expect(Reservation::count())->toBe(0);
});

test('cancelling an active reservation restores availability', function () {
    $student = makeUser(UserRole::Student);
    $book = Book::create([
        'title' => 'Refactoring',
        'author' => 'Martin Fowler',
        'isbn' => '9780201485677',
        'total_copies' => 1,
        'available_copies' => 0,
    ]);

    $reservation = Reservation::create([
        'user_id' => $student->id,
        'book_id' => $book->id,
        'reserved_at' => now(),
        'expires_at' => now()->addDays(3),
        'status' => 'active',
    ]);

    $this->actingAs($student)
        ->patch(route('student.reservations.update', $reservation), ['action' => 'cancel'])
        ->assertRedirect();

    $book->refresh();
    $reservation->refresh();

    expect($book->available_copies)->toBe(1);
    expect($reservation->status)->toBe('cancelled');
});

test('approving reservation creates borrowing transaction', function () {
    $librarian = makeUser(UserRole::Librarian);
    $student = makeUser(UserRole::Student);
    $book = Book::create([
        'title' => 'The Mythical Man-Month',
        'author' => 'Fred Brooks',
        'isbn' => '9780201835953',
        'total_copies' => 1,
        'available_copies' => 0,
    ]);

    $reservation = Reservation::create([
        'user_id' => $student->id,
        'book_id' => $book->id,
        'reserved_at' => now(),
        'expires_at' => now()->addDays(3),
        'status' => 'active',
    ]);

    $this->actingAs($librarian)
        ->patch(route('librarian.reservations.approve', $reservation))
        ->assertRedirect();

    $reservation->refresh();

    expect($reservation->status)->toBe('fulfilled');
    expect($reservation->fulfilled_at)->not->toBeNull();
    $this->assertDatabaseHas('borrowings', [
        'user_id' => $student->id,
        'book_id' => $book->id,
        'status' => 'borrowed',
    ]);
});

test('librarian can only create books using existing categories', function () {
    $librarian = makeUser(UserRole::Librarian);
    $category = Category::create([
        'name' => 'Technology',
        'slug' => 'technology',
    ]);

    $this->actingAs($librarian)
        ->post(route('librarian.books.store'), [
            'title' => 'Designing Data-Intensive Applications',
            'author' => 'Martin Kleppmann',
            'isbn' => '9781449373320',
            'category_id' => $category->id,
            'copies' => 2,
        ])
        ->assertRedirect();

    $this->assertDatabaseHas('books', [
        'isbn' => '9781449373320',
        'category_id' => $category->id,
    ]);
});
