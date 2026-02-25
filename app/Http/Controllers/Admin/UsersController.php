<?php

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Librarian;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($search = $request->string('q')->trim()->toString()) {
            $query->where(function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($role = $request->string('role')->toString()) {
            if ($role !== 'all') {
                $query->where('role', $role);
            }
        }

        if ($status = $request->string('status')->toString()) {
            if ($status === 'pending') {
                $query->whereNull('approved_at');
            }
            if ($status === 'active') {
                $query->whereNotNull('approved_at')->where('is_active', true);
            }
            if ($status === 'disabled') {
                $query->where('is_active', false);
            }
        }

        $users = $query
            ->latest()
            ->get()
            ->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role?->value ?? $user->role,
                'status' => $user->approved_at ? ($user->is_active ? 'Active' : 'Disabled') : 'Pending',
            ]);

        return Inertia::render('admin/users', [
            'filters' => [
                'q' => $request->string('q')->toString(),
                'role' => $request->string('role')->toString(),
                'status' => $request->string('status')->toString(),
            ],
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['required', 'in:admin,librarian,student'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => $data['role'],
            'is_active' => true,
            'approved_at' => now(),
        ]);

        if ($data['role'] === UserRole::Student->value) {
            Student::firstOrCreate(['user_id' => $user->id]);
        }

        if ($data['role'] === UserRole::Librarian->value) {
            Librarian::firstOrCreate(['user_id' => $user->id]);
        }

        return back()->with('status', 'User created.');
    }

    public function approve(User $user)
    {
        $user->update([
            'approved_at' => now(),
            'is_active' => true,
        ]);

        return back()->with('status', 'User approved.');
    }

    public function updateStatus(Request $request, User $user)
    {
        $data = $request->validate([
            'status' => ['required', 'in:active,disabled'],
        ]);

        $user->update([
            'is_active' => $data['status'] === 'active',
        ]);

        return back()->with('status', 'User status updated.');
    }
}
