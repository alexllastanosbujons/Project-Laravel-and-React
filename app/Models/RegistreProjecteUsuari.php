<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistreProjecteUsuari extends Model
{
    use HasFactory;

    protected $fillable = [
        'projectId',
        'userId',
        'startHour',
        'endHour'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
