<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DoctorType;
use App\Models\Location;
use App\Models\Patient;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DoctorType::factory()->count(5)->create();
        Location::factory()->count(15)->create();

        $availableDoctorTypes = DoctorType::pluck('id')->all();
        $randDrTypeIndex = array_rand($availableDoctorTypes);

        User::create([
            'name' => 'testAd',
            'last_name' => 'administrator',
            'user_role_id' => User::USER_ROLE_ADMIN,
            'username' => 'user_admin',
            'password' => Hash::make('password_admin')
        ]);

        User::create([
            'name' => 'testDr',
            'last_name' => 'doctor',
            'user_role_id' => User::USER_ROLE_DOCTOR,
            'doctor_type_id' => $availableDoctorTypes[$randDrTypeIndex],
            'username' => 'user_doctor',
            'password' => Hash::make('password_doctor')
        ]);

        Patient::factory()->count(20)->create();
    }
}
