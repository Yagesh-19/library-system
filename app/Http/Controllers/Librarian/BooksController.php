<?php

namespace App\Http\Controllers\Librarian;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BooksController extends Controller
{
    public function index(Request $request)
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

        if ($status = $request->string('status')->toString()) {
            if ($status === 'available') {
                $query->where('available_copies', '>', 0);
            }
            if ($status === 'borrowed') {
                $query->where('available_copies', '=', 0);
            }
        }

        if ($category = $request->string('category')->toString()) {
            if ($category !== 'all' && $category !== '') {
                $query->whereHas('category', fn ($builder) => $builder->where('slug', $category));
            }
        }

        $books = $query
            ->orderBy('title')
            ->get()
            ->map(fn (Book $book) => [
                'id' => $book->id,
                'title' => $book->title,
                'author' => $book->author,
                'isbn' => $book->isbn,
                'category' => $book->category?->name ?? 'Uncategorized',
                'category_id' => $book->category_id,
                'status' => $book->available_copies > 0 ? 'Available' : 'Borrowed',
                'available' => $book->available_copies,
                'total' => $book->total_copies,
            ]);

        $categories = Category::query()
            ->orderBy('name')
            ->get()
            ->map(fn (Category $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
            ]);

        return Inertia::render('librarian/books', [
            'filters' => [
                'q' => $request->string('q')->toString(),
                'status' => $request->string('status')->toString(),
                'category' => $request->string('category')->toString(),
            ],
            'books' => $books,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'isbn' => ['required', 'string', 'max:255', 'unique:books,isbn'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'copies' => ['required', 'integer', 'min:1'],
        ]);

        Book::create([
            'category_id' => $data['category_id'],
            'title' => $data['title'],
            'author' => $data['author'],
            'isbn' => $data['isbn'],
            'total_copies' => $data['copies'],
            'available_copies' => $data['copies'],
        ]);

        return back()->with('status', 'Book added.');
    }

    public function update(Request $request, Book $book)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
        ]);

        $book->update([
            'title' => $data['title'],
            'author' => $data['author'],
            'category_id' => $data['category_id'],
        ]);

        return back()->with('status', 'Book updated.');
    }

    public function updateStock(Request $request, Book $book)
    {
        $data = $request->validate([
            'total_copies' => ['required', 'integer', 'min:1'],
            'available_copies' => ['required', 'integer', 'min:0'],
        ]);

        $book->update([
            'total_copies' => $data['total_copies'],
            'available_copies' => min($data['available_copies'], $data['total_copies']),
        ]);

        return back()->with('status', 'Stock updated.');
    }

    public function destroy(Book $book)
    {
        $book->delete();

        return back()->with('status', 'Book archived.');
    }
}
