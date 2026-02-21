<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@libraryms.test');
        $password = env('ADMIN_PASSWORD', 'Admin@12345');

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => 'System Admin',
                'password' => Hash::make($password),
                'role' => UserRole::Admin,
                'is_active' => true,
                'approved_at' => now(),
            ]
        );

        $user->forceFill([
            'role' => UserRole::Admin,
            'is_active' => true,
            'approved_at' => $user->approved_at ?? now(),
        ])->save();

        Admin::firstOrCreate(
            ['user_id' => $user->id],
            ['role_title' => 'System Administrator']
        );
    }
}
