<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $locatonIDs = Location::pluck('id')->all();
        $randomIndex = array_rand($locatonIDs);

        return [
            'name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'personal_identification_number' => strval($this->faker->numerify('#############')),
            'location_id' => $locatonIDs[$randomIndex],
            'note' => ''
        ];
    }
}
