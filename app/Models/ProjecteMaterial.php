<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjecteMaterial extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectId',
        'materialId',
        'quantity'
    ];


    public function material()
    {
        return $this->belongsTo(Material::class, 'materialId');
    }
}
