<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Enums\UserRole;
use App\Models\Librarian;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'role' => ['required', 'in:'.implode(',', [UserRole::Student->value, UserRole::Librarian->value])],
            'password' => $this->passwordRules(),
        ])->validate();

        $role = $input['role'];
        $autoApprove = $role === UserRole::Student->value;

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'role' => $role,
            'is_active' => $autoApprove,
            'approved_at' => $autoApprove ? now() : null,
            'password' => $input['password'],
        ]);

        if ($role === UserRole::Student->value) {
            Student::create(['user_id' => $user->id]);
        }

        if ($role === UserRole::Librarian->value) {
            Librarian::create(['user_id' => $user->id]);
        }

        return $user;
    }
}
