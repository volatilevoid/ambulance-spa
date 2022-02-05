<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PatientsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $q = $request->get('q'); // search by id/name/last_name/location/jmbg
        $locatonID = $request->get('location_id');

        $query = Patient::query()->join('locations', 'patients.location_id', '=', 'locations.id');
        
        if(!is_null($q)) {
            $query->where('id', 'LIKE', "%{$q}%")
                ->orWhere('name', 'LIKE', "%{$q}%" )
                ->orWhere('last_name', 'LIKE', "%{$q}%");
        }

        if (!is_null($locatonID)) {
            $query->where('location_id', '=', $locatonID);
        }

        $query->select([
            'patients.id', 
            'patients.name', 
            'patients.last_name',
            'patients.personal_identification_number',
            'locations.name AS location'
        ]);

        $patients = DB::select($query->toSql(), $query->getBindings());

        return response()->json([
            'success' => true,
            'patients' => $patients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $patientID = $request->get('id');

        $validator = Validator::make($request->all(), [
            'id' => 'integer',
            'name' => 'string|required',
            'last_name' => 'string',
            'location_id' => 'integer|required',
            'personal_identification_number' => 'required|digits:13',
            'note' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()
            ]);
        }

        // update || create
        if ($patientID == 0) {
            $patient = Patient::create([
                'name' => $request->name,
                'last_name' => $request->last_name,
                'location_id' => $request->location_id,
                'personal_identification_number' => $request->personal_identification_number,
                'note' => $request->note,
            ]);
        } else {
            $patient = Patient::find($patientID);
            if (!is_null($patient)) {
                $patient->name = $request->name;
                $patient->last_name = $request->last_name;
                $patient->location_id = $request->location_id;
                $patient->personal_identification_number = $request->personal_identification_number;
                $patient->note = $request->note;
                if (!$patient->save()) {
                    throw new Exception('Error updating patient');
                }
            }
        }

        return response()->json([
            'success' => true,
            'patient' => $patient
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $patient = Patient::find($id);

        return response()->json([
            'patient' => $patient
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Patient::destroy($id);
        return response()->json([
            'message'=> Patient::destroy($id)
        ]);
    }
}
