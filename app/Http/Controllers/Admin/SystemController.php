<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BorrowingRule;
use App\Models\Category;
use App\Models\LibrarySetting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SystemController extends Controller
{
    public function index()
    {
        $rules = BorrowingRule::first() ?? BorrowingRule::create();
        $settings = LibrarySetting::query()->pluck('value', 'key');

        return Inertia::render('admin/system', [
            'rules' => [
                'max_books' => $rules->max_books,
                'borrow_days' => $rules->borrow_days,
                'renew_limit' => $rules->renew_limit,
            ],
            'settings' => [
                'library_name' => $settings['library_name'] ?? 'LibraryMS',
                'opening_hours' => $settings['opening_hours'] ?? 'Mon - Fri, 8am - 6pm',
                'contact_email' => $settings['contact_email'] ?? 'library@example.com',
            ],
            'categories' => Category::query()->orderBy('name')->get()->map(fn (Category $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
            ]),
        ]);
    }

    public function storeCategory(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $slug = Str::slug($data['name']);
        Category::firstOrCreate(['slug' => $slug], ['name' => $data['name']]);

        return back()->with('status', 'Category added.');
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();

        return back()->with('status', 'Category removed.');
    }

    public function updateRules(Request $request)
    {
        $data = $request->validate([
            'max_books' => ['required', 'integer', 'min:1'],
            'borrow_days' => ['required', 'integer', 'min:1'],
            'renew_limit' => ['required', 'integer', 'min:0'],
        ]);

        $rules = BorrowingRule::first() ?? BorrowingRule::create();
        $rules->update($data);

        return back()->with('status', 'Borrowing rules updated.');
    }

    public function updateSettings(Request $request)
    {
        $data = $request->validate([
            'library_name' => ['required', 'string', 'max:255'],
            'opening_hours' => ['required', 'string', 'max:255'],
            'contact_email' => ['required', 'email', 'max:255'],
        ]);

        foreach ($data as $key => $value) {
            LibrarySetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return back()->with('status', 'Settings updated.');
    }
}
