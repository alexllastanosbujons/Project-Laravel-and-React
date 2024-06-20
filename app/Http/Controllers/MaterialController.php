<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Material/Index');
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

        $validator = Validator::make($data, [
            'name' => 'required|string',
            'price' => 'required|numeric',
            'proveidorId' => 'required|numeric',
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $material = Material::create([
            'name' => $data['name'],
            'price' => $data['price'],
            'proveidorId' => $data['proveidorId'],
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Client created successfully',
            'data' => $material,
        ]);
    
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $material = Material::find($request->id);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'price' => 'required|numeric',
            'proveidorId' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }
        $material->update($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Proveidor updated successfully',
            'data' => $material,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $material = Material::find($request->id);
        if (!$material) {
            return response()->json(['error' => 'Material not found'], 404);
        }
        $material->delete();
        return response()->json(['message' => 'Material deleted successfully']);
    }

    public function getAllMaterials()
    {
        $materials = Material::all();
        return response()->json([
            'status' => 'success',
            'message' => 'Materials retrieved successfully',
            'materials' => $materials,
        ]);
    }

    public function getMaterialById($id)
    {
        $material = Material::find($id);
        if (!$material) {
            return response()->json(['error' => 'Material not found'], 404);
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Material retrieved successfully',
            'material' => $material,
        ]);
    }
}
