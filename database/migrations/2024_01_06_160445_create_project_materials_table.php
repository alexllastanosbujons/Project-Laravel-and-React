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
        Schema::create('projecte_materials', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('materialId');
            $table->foreignId('projectId')->constrained('projects')->onDelete('cascade');
            $table->integer('quantity');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_materials');
    }
};
