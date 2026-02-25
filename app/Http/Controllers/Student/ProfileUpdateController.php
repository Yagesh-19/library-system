<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProfileUpdateController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'student_number' => ['nullable', 'string', 'max:255'],
        ]);

        $user = $request->user();
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
        ]);

        if ($user->student) {
            $user->student->update([
                'student_number' => $data['student_number'],
            ]);
        }

        return back()->with('status', 'Profile updated.');
    }
}
