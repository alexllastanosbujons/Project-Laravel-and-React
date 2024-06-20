<?php

namespace App\Http\Controllers;

use App\Models\Proveidor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProveidorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'nullable|string|email',
            'phone' => 'nullable|string|regex:/^\+[0-9]{1,3}-[0-9]+$/',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }
    
        $proveidor = Proveidor::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
        ]);
    
        return response()->json([
            'status' => 'success',
            'message' => 'Proveidor created successfully',
            'data' => $proveidor,
        ]);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Proveidor $proveidor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Proveidor $proveidor)
    {
        //
    }


    public function update(Request $request, Proveidor $proveidor)
    {
        $proveidor = Proveidor::find($request->id);
       $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'nullable|string|email',
            'phone ' => 'nullable|string|regex:/^\+[0-9]{1,3}-[0-9]+$/',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $proveidor->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Proveidor updated successfully',
            'data' => $proveidor,
        ]);
    }


    public function destroy(Request $request)
    {
        $proveidor = Proveidor::find($request->id);
        if (!$proveidor) {
            return response()->json(['error' => 'Proveidor no trobat'], 404);
        }
        $proveidor->delete();
        return response()->json(['message' => 'Proveidor deleted successfully']);

    }
    public function getAllProveidors()
    {
        $proveidors = Proveidor::all();
        return response()->json([
            'proveidors' => $proveidors
        ]);
    }

    public function getProveidorById(Request $request)
    {
        $proveidor = Proveidor::find($request->id);
        return response()->json([
            'proveidor' => $proveidor
        ]);
    }

}
