<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $fillable=[
        'name',
        'price',
        'proveidorId'
    ];

    public function proveidor()
{
    return $this->belongsTo(Proveidor::class, 'proveidorId');
}

}
