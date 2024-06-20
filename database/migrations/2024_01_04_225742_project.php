<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->date('startDate');
            $table->date('endDate')->nullable();
            $table->decimal('budget', 10, 2);
            $table->decimal('finalPrice', 10, 2)->nullable();
            $table->unsignedBigInteger('clientId');
            $table->boolean('finished')->default(false);
            $table->integer('expectedHours')->nullable();
            $table->timestamps();
            $table->foreign('clientId')->references('id')->on('clients')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');

    }
};
