<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use App\Models\Examination;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ExaminationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $doctorID = Auth::user()->id;

        $query = Examination::query()
            // ->join('users', 'examinations.user_id', '=', 'users.id')
            ->join('patients', 'examinations.patient_id', '=', 'patients.id')
            ->where('user_id', '=', $doctorID)
            ->where('is_completed', '=', false);

        $query->select([
            'examinations.id', 
            'patient_id', 
            DB::raw("CONCAT(patients.name, ' ', patients.last_name) AS patient"),
            'scheduled_appointment',
            'is_completed'
        ]);

        $examinations = DB::select($query->toSql(), $query->getBindings());

        return response()->json([
            'success' => true,
            'examinations' => $examinations
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
        $validator = Validator::make($request->all(), [
            'id' => 'integer|required',
            'diagnosis' => 'string',
            'is_completed' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()
            ]);
        }

        $examination = Examination::find($request->id);
        $isCompleted = $request->get('is_completed', false);

        if (is_null($examination)) {
            return response()->json([
                'success' => false,
                'message' => "Invalid examination"
            ]);
        }

        $examination->diagnosis = $request->diagnosis;
        // Doctor can only close examination, not to open it
        if (!$examination->is_completed && $isCompleted) {
            $examination->is_completed = $isCompleted;
        }
        
        if (!$examination->save()) {
            throw new Exception('Error updating patient');
        }


        return response()->json([
            'success' => true,
            'examination' => $examination
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
        $examination = Examination::query()
            ->join('patients', 'examinations.patient_id', '=', 'patients.id')
            ->where('user_id', '=', Auth::user()->id)
            ->where('examinations.id', '=', $id)
            ->select([
                'examinations.id', 
                DB::raw("CONCAT(patients.name, ' ', patients.last_name) AS patient"),
                'scheduled_appointment',
                'diagnosis',
                'is_completed'
            ])->get()->all()[0];


        return response()->json([
            'examination' => $examination
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
        //
    }
}
