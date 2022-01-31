<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var string[]|bool
     */
    protected $guarded = [];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
    // TODO
    // public function doctors()
    // {
    //     return $this->belongsToMany(User::class, 'examinations', 'patient_id')->using(Examination::class);
    // }
}
