<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Location;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LocationsController extends Controller
{
    public function get(Request $request)
    {
        $allLocations = Location::all(['id', 'name']);

        return response()->json([
            'locations' => $allLocations
        ]);
    }
}
