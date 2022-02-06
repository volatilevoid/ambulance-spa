<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\DoctorType;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

/**
 * TODO
 * 
 * - search
 * - admin examination form (edit/create)
 * - admin examinations
 * 
 * - dr examination form (edit diagnosis and is_completed)
 * - dr examinations list
 * 
 */

class DoctorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $q = $request->get('q'); // search by id/name/last_name/location/jmbg
        $doctorTypeID = $request->get('doctor_type_id');

        $query = User::query()
            ->join('doctor_types', 'users.doctor_type_id', '=', 'doctor_types.id')
            ->where('user_role_id', '=', User::USER_ROLE_DOCTOR);

        if(!is_null($q)) {
            $query->where('id', 'LIKE', "%{$q}%")
                ->orWhere('name', 'LIKE', "%{$q}%" )
                ->orWhere('last_name', 'LIKE', "%{$q}%");
        }

        if (!is_null($doctorTypeID)) {
            $query->where('doctor_type_id', '=', $doctorTypeID);
        }

        $query->select(['users.id AS id', 'users.name AS name', 'last_name', 'doctor_types.name AS type', 'doctor_types.id AS type_id', 'username']);

        $doctors = DB::select($query->toSql(), $query->getBindings());


        return response()->json([
            'success' => true,
            'doctors' => $doctors
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
     * Store a newly created resource in storage || Update resource
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $doctorID = $request->get('id');

        $validator = Validator::make($request->all(), [
            'id' => 'integer',
            'name' => 'string|required',
            'last_name' => 'string',
            'type_id' => 'integer|required',
            'username' => 'required|string',
            'password' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()
            ]);
        }

        if ($doctorID == 0) {
            $doctor = User::create([
                'name' => $request->name,
                'last_name' => $request->last_name,
                'doctor_type_id' => $request->type_id,
                'user_role_id' => User::USER_ROLE_DOCTOR,
                'username' => $request->username,
                'password' => $request->password,
            ]);
        } else {
            $doctor = User::find($doctorID);

            if (!is_null($doctor)) {
                $doctor->name = $request->name;
                $doctor->last_name = $request->last_name;
                $doctor->doctor_type_id = $request->type_id;
                $doctor->username = $request->username;

                if ($request->password !== '') {
                    $doctor->password = Hash::make($request->password);
                }
                
                if (!$doctor->save()) {
                    throw new Exception('Error updating patient');
                }
            }
        }

        return response()->json([
            'success' => true,
            'doctor' => $doctor
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
        $doctor = User::find($id);

        return response()->json([
            'doctor' => $doctor
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
        return response()->json([
            'message'=> User::destroy($id)
        ]);
    }

    public function getDoctorTypes()
    {
        $allTypes = DoctorType::all(['id', 'name']);

        return response()->json([
            'doctor_types' => $allTypes
        ]);
    }

}
