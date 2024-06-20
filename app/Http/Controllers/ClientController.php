<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ClientController extends Controller
{
    public function store(Request $request)
    {

        $data = json_decode($request->getContent(), true);
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

        $client = Client::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Client created successfully',
            'data' => $client,
        ]);
    }

    public function getAllClients(Request $request)
    {
        $clients = Client::all();
        return response()->json([
            'clients' => $clients
        ]);
    }

    public function getClientById($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response()->json(['error' => 'Cliente no trobat'], 404);
        }

        return response()->json(['client' => $client]);
    }

    public function destroy(Request $request)
    {
        $client = Client::find($request->id);
        if (!$client) {
            return response()->json(['error' => 'Cliente no trobat'], 404);
        }

        $client->delete();
        return response()->json(['message' => 'Client eliminat correctament']);
    }

    public function update(Request $request)
    {
        $client = Client::find($request->id);
        if (!$client) {
            return response()->json(['error' => 'Cliente no trobat'], 404);
        }

        $client->update($request->all());
        return response()->json(['message' => 'Client actualitzat correctament']);
    }

    public function index ()
    {
        return Inertia::render('Client/Index');
    }
}