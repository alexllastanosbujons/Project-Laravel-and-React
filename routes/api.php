<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ProjecteMaterialController;
use App\Http\Controllers\ProveidorController;
use App\Http\Controllers\RegistreProjecteUsuariController;
use App\Http\Controllers\UserController;
use App\Models\Proveidor;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/storeProject', [ProjectController::class, 'store'])->name('project.store');
Route::post('/storeClient', [ClientController::class, 'store'])->name('client.store');
Route::post('/storeMaterial', [MaterialController::class, 'store'])->name('material.store');
Route::post('/storeProveidor', [ProveidorController::class, 'store'])->name('proveidor.store');
Route::post('/storeHour', [RegistreProjecteUsuariController::class, 'store'])->name('hour.store');
Route::post('/getClientById', [ClientController::class, 'getClientById'])->name('getClientById');
Route::get('/getClients', [ClientController::class, 'getAllCLients'])->name('getClients');
Route::get('/getUsers', [UserController::class, 'getAllUsers'])->name('getUsers');
Route::get('/getProjects', [ProjectController::class, 'getAllProjects'])->name('getProjects');
Route::get('/getMaterials', [MaterialController::class, 'getAllMaterials'])->name('getMaterials');
Route::get('/getProveidors', [ProveidorController::class, 'getAllProveidors'])->name('getProveidors');
Route::get('/getClientById/{id}', [ClientController::class, 'getClientById']);
Route::get('/getHoursByProjectId/{id}', [RegistreProjecteUsuariController::class, 'getHoursByProjectId']);
Route::post('/storeMaterialUsed', [ProjecteMaterialController::class, 'store'])->name('materialUsed.store');
Route::get('/getMaterialUsedByProjectId/{id}', [ProjecteMaterialController::class, 'getMaterialsUsedByProjectId']);
Route::get('/getAllClients', [ClientController::class, 'getAllClients']);
Route::get('/getAllProjects', [ProjectController::class, 'getAllProjects']);
Route::get('/getProjectById/{id}', [ProjectController::class, 'getProjectById']);
Route::delete('/deleteClient/{id}', [ClientController::class, 'destroy']);
Route::delete('/deleteProject/{id}', [ProjectController::class, 'destroy']);
Route::delete('/deleteMaterial/{id}', [MaterialController::class, 'destroy']);
Route::delete('/deleteProveidor/{id}', [ProveidorController::class, 'destroy']);
Route::delete('/deleteHour/{id}', [RegistreProjecteUsuariController::class, 'destroy']);
Route::delete('/deleteMaterialUsed/{id}', [ProjecteMaterialController::class, 'destroy']);
Route::delete('/deleteUser/{id}', [UserController::class, 'destroy']);
Route::put('/updateClient/{id}', [ClientController::class, 'update']);
Route::put('/updateProject/{id}',[ProjectController::class, 'update']);
Route::get('/getProveidor/{id}', [ProveidorController::class, 'getProveidorById']);
Route::put('/updateProveidor/{id}', [ProveidorController::class, 'update']);
Route::get('/getMaterialById/{id}', [MaterialController::class, 'getMaterialById']);
Route::put('/updateMaterial/{id}', [MaterialController::class, 'update']);
Route::get('/getUserById/{id}', [UserController::class, 'getUserById']);
Route::put('/updateUser/{id}', [UserController::class, 'update']);
Route::post('/storeUser', [UserController::class, 'store']);
Route::get('/updateAdminState/{id}', [UserController::class, 'updateAdminState']);
Route::post('/getHourByUserId/{id}', [RegistreProjecteUsuariController::class, 'getHoursByUserId']);
Route::put('/projectFinished/{id}', [ProjectController::class, 'projectFinished']);