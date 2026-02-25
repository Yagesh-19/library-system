<?php

namespace App\Http\Controllers\Librarian;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MembersController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::query()->with('user');

        if ($search = $request->string('q')->trim()->toString()) {
            $query->whereHas('user', function ($builder) use ($search) {
                $builder
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if ($status = $request->string('status')->toString()) {
            if ($status === 'active') {
                $query->whereHas('user', fn ($builder) => $builder->where('is_active', true));
            }
            if ($status === 'suspended') {
                $query->whereHas('user', fn ($builder) => $builder->where('is_active', false));
            }
        }

        $members = $query
            ->latest()
            ->get()
            ->map(fn (Student $student) => [
                'id' => $student->id,
                'member_id' => $student->student_number ?? 'ST-'.$student->id,
                'name' => $student->user?->name ?? 'Unknown',
                'email' => $student->user?->email ?? 'N/A',
                'type' => 'Student',
                'status' => $student->user?->is_active ? 'Active' : 'Suspended',
                'user_id' => $student->user_id,
            ]);

        return Inertia::render('librarian/members', [
            'filters' => [
                'q' => $request->string('q')->toString(),
                'status' => $request->string('status')->toString(),
            ],
            'members' => $members,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'member_type' => ['nullable', 'string', 'max:255'],
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => UserRole::Student,
            'is_active' => true,
        ]);

        Student::create([
            'user_id' => $user->id,
            'student_number' => 'ST-'.$user->id,
        ]);

        return back()->with('status', 'Member added.');
    }

    public function updateStatus(Request $request, Student $student)
    {
        $data = $request->validate([
            'status' => ['required', 'in:active,suspended'],
        ]);

        $student->user?->update([
            'is_active' => $data['status'] === 'active',
        ]);

        return back()->with('status', 'Member status updated.');
    }
}
