<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Admin\ExaminationsController as AdminExaminationsController;
use App\Http\Controllers\Api\Admin\DoctorsController as AdminDoctorsController;
use App\Http\Controllers\Api\Admin\PatientsController as AdminPatientsController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'admin'], function() {
    Route::resource('examinations', AdminExaminationsController::class);
    Route::resource('doctors', AdminDoctorsController::class);
    Route::resource('patients', AdminPatientsController::class);
});