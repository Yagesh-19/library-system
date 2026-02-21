<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BorrowingRule extends Model
{
    protected $fillable = [
        'max_books',
        'borrow_days',
        'renew_limit',
    ];
}
