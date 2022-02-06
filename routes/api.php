<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\ExaminationsController as AdminExaminationsController;
use App\Http\Controllers\Api\Admin\DoctorsController as AdminDoctorsController;
use App\Http\Controllers\Api\Admin\PatientsController as AdminPatientsController;
use App\Http\Controllers\Api\Doctor\ExaminationsController as DoctorExaminationsController;
use App\Http\Controllers\Api\Admin\LocationsController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::get('check-token', [AuthController::class, 'isTokenValid']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('locations', [LocationsController::class, 'get']);
    Route::get('unavailable-examination-dates', [AdminExaminationsController::class, 'unavailableDates']);

    Route::group(['prefix' => 'admin'], function() {
        Route::resource('examinations', AdminExaminationsController::class);
        Route::get('doctor-types', [AdminDoctorsController::class, 'getDoctorTypes']);
        Route::resource('doctors', AdminDoctorsController::class);
        Route::resource('patients', AdminPatientsController::class);
    });

    Route::group(['prefix' => 'doctor'], function() {
        Route::resource('examinations', DoctorExaminationsController::class);
    });
});
