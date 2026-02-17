<?php

namespace App\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Librarian = 'librarian';
    case Student = 'student';
}
