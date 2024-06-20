<?php

namespace App\Http\Controllers;

use App\Models\ProjecteMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProjecteMaterialController extends Controller
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

        $validator = Validator::make($data, [
            'projectId' => 'required|numeric',
            'materialId' => 'required|numeric',
            'quantity' => 'required|numeric',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $registreHorari = ProjecteMaterial::create([
            'projectId' => $data['projectId'],
            'materialId' => $data['materialId'],
            'quantity' => $data['quantity'],
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Material Used created successfully',
            'data' => $registreHorari,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProjecteMaterial $projecteMaterial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProjecteMaterial $projecteMaterial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProjecteMaterial $projecteMaterial)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $materialUsed = ProjecteMaterial::find($request->id);
        if (!$materialUsed) {
            return response()->json(['error' => 'Material Used not found'], 404);
        }
        $materialUsed->delete();
        return response()->json(['message' => 'Material Used deleted successfully']);
    }


    public function getMaterialsUsedByProjectId($id)
    {
        $materialsUsed = ProjecteMaterial::where('projectId', $id)
            ->with(['material.proveidor'])
            ->get();

        $formattedMaterialsUsed = $materialsUsed->map(function ($materialUsed) {
        $material = $materialUsed->material;
        $proveidor = $material->proveidor;
        $total = number_format($materialUsed->quantity * $material->price, 2, '.', '');


            return [
                'id' => $materialUsed->id,
                'material' => $material->name,
                'proveidor' => $proveidor->name,
                'quantity' => $materialUsed->quantity,
                'price' => $material->price,
                'total' => $materialUsed->quantity * $material->price,
            ];
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Materials Used by Project Id',
            'materials' => $formattedMaterialsUsed,
        ]);
    }
}
