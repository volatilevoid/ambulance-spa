<?php

namespace Database\Factories;

use App\Models\DoctorType;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorTypeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string|null
     */
    protected $model = DoctorType::class;


    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $types = ['Family physician', 'Psychiatrist', 'Gynecologist', 'Pediatrician'];

        $randIndex = array_rand($types);
        
        return [
            'name' => $types[$randIndex]
        ];
    }
}
