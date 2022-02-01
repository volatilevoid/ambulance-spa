<?php

namespace App\Models;

use Database\Factories\DoctorTypeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DoctorType extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var string[]|bool
     */
    protected $guarded = [];

    public function doctors()
    {
        return $this->hasMany(User::class, 'doctor_type_id', 'id');
    }

    /**
     * Create a new factory instance for the model.
     * 
     * For testing purpose
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    protected static function newFactory()
    {
        return DoctorTypeFactory::new();
    }
}
