<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistreProjecteUsuarisTable extends Migration
{
    public function up()
    {
        Schema::create('registre_projecte_usuaris', function (Blueprint $table) {
            $table->id();
            $table->foreignId('projectId')->constrained('projects')->onDelete('cascade');
            $table->foreignId('userId')->constrained('users')->onDelete('cascade');
            $table->datetime('startHour');
            $table->datetime('endHour');
            $table->timestamps();
        });
        
    }

    public function down()
    {
        Schema::dropIfExists('registre_projecte_usuaris');
    }
}
