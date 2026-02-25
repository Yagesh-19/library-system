<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function __invoke(Request $request)
    {
        $query = Book::query()->with('category');

        if ($search = $request->string('q')->trim()->toString()) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%")
                    ->orWhere('isbn', 'like', "%{$search}%");
            });
        }

        if ($availability = $request->string('availability')->toString()) {
            if ($availability === 'all') {
                $availability = '';
            }
            if ($availability === 'available') {
                $query->where('available_copies', '>', 0);
            }
            if ($availability === 'reserved') {
                $query->where('available_copies', '=', 0);
            }
        }

        if ($category = $request->string('category')->toString()) {
            if ($category !== 'all') {
            $query->whereHas('category', fn ($builder) => $builder->where('slug', $category));
            }
        }

        if ($year = $request->integer('year')) {
            $query->where('publication_year', $year);
        }

        $books = $query
            ->orderBy('title')
            ->take(24)
            ->get()
            ->map(fn (Book $book) => [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'tag' => $book->available_copies > 0 ? 'Available' : 'Reserved',
                'available' => $book->available_copies,
                'total' => $book->total_copies,
                'genre' => $book->category?->name ?? 'General',
                'cover' => $book->cover_url,
            ]);

        $categories = Category::query()
            ->orderBy('name')
            ->get()
            ->map(fn (Category $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
            ]);

        return Inertia::render('student/search', [
            'filters' => [
                'q' => $request->string('q')->toString(),
                'availability' => $request->string('availability')->toString(),
                'category' => $request->string('category')->toString(),
                'year' => $request->integer('year'),
            ],
            'categories' => $categories,
            'books' => $books,
        ]);
    }
}
