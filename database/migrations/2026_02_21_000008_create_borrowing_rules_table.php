<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('borrowing_rules', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('max_books')->default(3);
            $table->unsignedInteger('borrow_days')->default(14);
            $table->unsignedInteger('renew_limit')->default(1);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('borrowing_rules');
    }
};
