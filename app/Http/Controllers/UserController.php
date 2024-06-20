<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{
    public function getAllUsers(Request $request)
    {
        $users = User::all();
        return response()->json([
            'users' => $users
        ]);
    }

    public function destroy(Request $request)
    {
        $user = User::find($request->id);
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully'
        ]);
    }

    public function index()
    {
        return Inertia::render('User/Index');
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json(['user' => $user]);
    }
    public function store(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'priceHour' => 'required|numeric',
            'password' => 'required|string|min:6',
            'password2' => 'required|string|min:6|same:password',
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'priceHour' => $data['priceHour'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => $user,
        ]);
    }


    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $request->id,
            'priceHour' => 'required|numeric',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->priceHour = $request->priceHour;

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
        ]);
    }


    public function updateAdminState(Request $request)
    {
        $user = User::find($request->id);
        if ($user->admin == 1) {
            $user->admin = 0;
        } else {
            $user->admin = 1;
        }
        $user->save();
        return response()->json([
            'message' => 'User updated successfully'
        ]);
    }
}
