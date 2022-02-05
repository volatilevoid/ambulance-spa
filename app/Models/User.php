<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use  HasApiTokens, HasFactory, Notifiable;

    const USER_ROLE_ADMIN = 1;
    const USER_ROLE_DOCTOR = 2;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'last_name',
        'email',
        'user_role_id',
        'doctor_type_id',
        'username',
        'password'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public function doctorType()
    {
        return $this->belongsTo(DoctorType::class);
    }
    
    public function examinations()
    {
        return $this->hasMany(Examination::class, 'doctor_id');
    }

    public function isAdmin(): bool
    {
        return $this->user_role_id === self::USER_ROLE_ADMIN;
    }

    public function isDoctor(): bool
    {
        return $this->user_role_id === self::USER_ROLE_DOCTOR;
    }

    public function getUserRole()
    {
        return $this->user_role_id === self::USER_ROLE_ADMIN ? 'admin' : 'doctor';
    }
}
