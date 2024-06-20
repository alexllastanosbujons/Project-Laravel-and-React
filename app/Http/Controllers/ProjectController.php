<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\RegistreProjecteUsuari;


class ProjectController extends Controller
{
    public function store(Request $request)
    {

        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data, [
            'name' => 'required|string',
            'description' => 'required|string',
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date',
            'budget' => 'required|numeric',
            'finalPrice' => 'nullable|numeric',
            'clientId' => 'required|exists:clients,id',
            'finished' => 'nullable|boolean',
            'expectedHours' => 'nullable|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        $project = Project::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'startDate' => now(),
            'endDate' => null,
            'budget' => $data['budget'],
            'finalPrice' => null,
            'clientId' => $data['clientId'],
            'finished' => false,
            'expectedHours' => $data['expectedHours']
        ]);
        return response()->json([
            'status' => 'success',
            'message' => 'Client created successfully',
            'data' => $project,
        ]);
    }

    public function getAllProjects(Request $request)
    {
        $projects = Project::all();
        return response()->json([
            'projects' => $projects
        ]);
    }


    public function show(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $project = Project::find($data['id']);
        return response()->json([
            'project' => $project
        ]);


    }

    public function update(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $validator = Validator::make($data, [
            'name' => 'required|string',
            'description' => 'required|string',
            'startDate' => 'nullable|date',
            'endDate' => 'nullable|date',
            'budget' => 'required|numeric',
            'finalPrice' => 'nullable|numeric',
            'clientId' => 'required|exists:clients,id',
            'finished' => 'nullable|boolean',
            'expectedHours' => 'nullable|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }
        
        $project = Project::find($request->id);
        $project->name = $data['name'];
        $project->description = $data['description'];
        $project->startDate = $data['startDate'];
        $project->endDate = $data['endDate'];
        $project->budget = $data['budget'];
        $project->finalPrice = $data['finalPrice'];
        $project->clientId = $data['clientId'];
        $project->expectedHours = $data['expectedHours'];
        $project->save();
        return response()->json([
            'project' => $project
        ]);
    }

    public function projectView(Request $request){
        $project = Project::find($request->id);
        return Inertia::render('Project/IndexProject', [
            'project' => $project
        ]);
    }

    public function destroy($id){
        $project = Project::find($id);
    
        if (!$project) {
            return response()->json(['error' => 'Projecte no trobat'], 404);
        }
    
        $project->delete();
        return response()->json(['message' => 'Projecte eliminat correctament']);
    }
    

    public function getProjectById($id){
        $project = Project::find($id);

        if (!$project) {
            return response()->json(['error' => 'Cliente no trobat'], 404);
        }

        return response()->json(['project' => $project]);
    }
    public function index(){
        return Inertia::render('Project/Index');
            
    }

    public function projectFinished(Request $request){
        $project = Project::find($request->id);
        $project->finished = true;
        $project->save();
        return response()->json([
            'project' => $project
        ]);
    }
    
}

