<?php

namespace App\Http\Controllers;

use App\Models\RegistreProjecteUsuari;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\User;

class RegistreProjecteUsuariController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data, [
            'projectId' => 'required|numeric',
            'userId' => 'required|numeric',
            'startHour' => ['required', 'date', 'before:now'],
            'endHour' => ['required', 'date', 'after:startHour'],

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $registreHorari = RegistreProjecteUsuari::create([
            'projectId' => $data['projectId'],
            'userId' => $data['userId'],
            'startHour' => $data['startHour'],
            'endHour' => $data['endHour'],
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Register created successfully',
            'data' => $registreHorari,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(RegistreProjecteUsuari $registreProjecteUsuari)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RegistreProjecteUsuari $registreProjecteUsuari)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RegistreProjecteUsuari $registreProjecteUsuari)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $registre = RegistreProjecteUsuari::find($request->id);
        if (!$registre) {
            return response()->json(['error' => 'Register not found'], 404);
        }
        $registre->delete();
        return response()->json([
            'message' => 'Register deleted successfully'
        ]);
        

    }
   

    public function getHoursByProjectId(Request $request, $id)
    {
        try {
            $validator = Validator::make(['projectId' => $id], [
                'projectId' => 'required|numeric',
            ]);

            if ($validator->fails()) {
                throw new \Exception('Validation failed');
            }

            $registreHorari = RegistreProjecteUsuari::where('projectId', $id)
                ->with('user')
                ->get();

            $mappedHours = $registreHorari->map(function ($hora) {
                return [
                    'id' => $hora->id,
                    'projectId' => $hora->projectId,
                    'userName' => $hora->user->name,
                    'startHour' => $hora->startHour,
                    'endHour' => $hora->endHour,
                ];
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Register fetched successfully',
                'hours' => $mappedHours,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function getHoursByUserId($id, Request $request )
{   
    try {
        $validator = Validator::make($request->all(), [
            'firstDay' => 'required|date',
            'lastDay' => 'required|date',
        ]);

        if ($validator->fails()) {
            throw new \Exception('Validation failed');
        }

        $userId = $id;
        $firstDay = $request->firstDay;
        $lastDay = $request->lastDay;

        $registreHorari = RegistreProjecteUsuari::where('userId', $userId)
            ->whereDate('startHour', '>=', $firstDay)
            ->whereDate('endHour', '<=', $lastDay)
            ->get();

        $mappedHours = $registreHorari->map(function ($hora) {
            return [
                'id' => $hora->id,
                'projectId' => $hora->projectId,
                'startHour' => $hora->startHour,
                'endHour' => $hora->endHour,
            ];
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Register fetched successfully',
            'hours' => $mappedHours,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
}

public static function getHoursByProjectIdToDestroy($id){
    try {
        $validator = Validator::make(['projectId' => $id], [
            'projectId' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            throw new \Exception('Validation failed');
        }

        $registreHorari = RegistreProjecteUsuari::where('projectId', $id)
            ->get();

        $mappedHours = $registreHorari->map(function ($hora) {
            return [
                'id' => $hora->id,
                'projectId' => $hora->projectId,
                'startHour' => $hora->startHour,
                'endHour' => $hora->endHour,
            ];
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Register fetched successfully',
            'hours' => $mappedHours,
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage(),
        ], 500);
    }
}


}
