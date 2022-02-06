<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Examination;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ExaminationsController extends Controller
{
    // Examination duration in [min]
    const DURATION_TIME_MIN = 30;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // TODO filter
        $patientID = $request->get('patient_id');
        $doctorID = $request->get('user_id');
        $from = $request->get('from');
        $to = $request->get('to');
        $isCompleted = $request->get('is_completed');

        $query = Examination::query()
            ->join('users', 'examinations.user_id', '=', 'users.id')
            ->join('patients', 'examinations.patient_id', '=', 'patients.id');

        $query->select([
            'examinations.id', 
            'users.id AS user_id', 
            DB::raw("CONCAT(users.name, ' ', users.last_name) AS doctor"),
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
        $examinationID = $request->get('id');
        
        $validator = Validator::make($request->all(), [
            'id' => 'integer',
            'patient_id' => 'integer|exists:patients,id',
            'user_id' => 'integer|exists:users,id',
            'scheduled_appointment' => 'required|string',
            'is_completed' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()
            ]);
        }

        $appointmentDatetime = Carbon::createFromFormat('d/m/Y, H:i:s', $request->scheduled_appointment);

        if ($examinationID == 0) {
            $examination = Examination::create([
                'patient_id' => $request->patient_id,
                'user_id' => $request->user_id,
                'scheduled_appointment' => $appointmentDatetime,
                'diagnosis' => ''
            ]);
        } else {
            $examination = Examination::find($examinationID);

            if (is_null($examination)) {
                return response()->json([
                    'success' => false,
                    'message' => ['examination' => 'Invalid examination']
                ]);
            }

            $examination->patient_id = $request->patient_id;
            $examination->user_id = $request->user_id;
            $examination->scheduled_appointment = $appointmentDatetime;
            $examination->diagnosis = $request->diagnosis;
            $examination->is_completed = $request->is_completed;
            
            if (!$examination->save()) {
                throw new Exception('Error updating patient');
            }
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
        $examination = Examination::find($id);

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
        return response()->json([
            'message'=> Examination::destroy($id)
        ]);
    }
    // TODO
    public function unavailableDtForSchedule(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'integer|required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ]);
        }

        $availableDates = Examination::where('user_id', '=', $request->user_id)
            ->pluck('scheduled_appointment');

        return response()->json([
            'dates' => $availableDates
        ]);
    }
}
