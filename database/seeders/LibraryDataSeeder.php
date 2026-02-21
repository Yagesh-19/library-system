<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\Borrowing;
use App\Models\Category;
use App\Models\LibraryNotification;
use App\Models\Reservation;
use App\Models\Student;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class LibraryDataSeeder extends Seeder
{
    public function run(): void
    {
        $categories = collect([
            'Fiction',
            'Science',
            'Technology',
            'Biography',
            'History',
        ])->map(function ($name) {
            return Category::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name, 'description' => $name.' books']
            );
        });

        $books = collect([
            ['The Alchemist', 'Paulo Coelho', '9780061122415', 1993, 'Fiction'],
            ['Harry Potter', 'J.K. Rowling', '9780439708180', 1998, 'Fiction'],
            ['The Pragmatic Programmer', 'Andrew Hunt', '9780201616224', 1999, 'Technology'],
            ['A Brief History of Time', 'Stephen Hawking', '9780553380163', 1998, 'Science'],
            ['Becoming', 'Michelle Obama', '9781524763138', 2018, 'Biography'],
        ])->map(function ($row) use ($categories) {
            [$title, $author, $isbn, $year, $categoryName] = $row;
            $category = $categories->first(fn ($cat) => $cat->name === $categoryName);

            return Book::firstOrCreate(
                ['isbn' => $isbn],
                [
                    'category_id' => $category?->id,
                    'title' => $title,
                    'author' => $author,
                    'publication_year' => $year,
                    'total_copies' => 5,
                    'available_copies' => 3,
                ]
            );
        });

        $user = User::firstOrCreate(
            ['email' => 'mani@gmail.com'],
            [
                'name' => 'mani',
                'password' => Hash::make('qwerty123'),
                'role' => UserRole::Student,
            ]
        );

        $user->forceFill(['role' => UserRole::Student])->save();

        Student::firstOrCreate(
            ['user_id' => $user->id],
            ['student_number' => 'ST-1001', 'department' => 'General']
        );

        $borrowedBook = $books->first();
        if ($borrowedBook) {
            Borrowing::firstOrCreate(
                ['user_id' => $user->id, 'book_id' => $borrowedBook->id, 'status' => 'borrowed'],
                [
                    'borrowed_at' => now()->subDays(2),
                    'due_at' => now()->addDays(10),
                ]
            );
        }

        $reservationBook = $books->skip(1)->first();
        if ($reservationBook) {
            Reservation::firstOrCreate(
                ['user_id' => $user->id, 'book_id' => $reservationBook->id, 'status' => 'active'],
                [
                    'reserved_at' => now()->subDay(),
                    'expires_at' => now()->addDays(3),
                ]
            );
        }

        LibraryNotification::firstOrCreate(
            ['user_id' => $user->id, 'title' => 'New arrival: "Project Hail Mary"'],
            ['body' => 'Check out the latest science fiction release.', 'type' => 'new-arrival']
        );

        LibraryNotification::firstOrCreate(
            ['user_id' => $user->id, 'title' => 'Reminder: return due soon'],
            ['body' => 'Your borrowed book is due in 3 days.', 'type' => 'reminder']
        );
    }
}
