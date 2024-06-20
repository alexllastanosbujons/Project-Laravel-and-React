<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\Project;
use App\Models\ProjecteMaterial;
use App\Models\RegistreProjecteUsuari;
use Illuminate\Support\Facades\Validator;

class PdfController extends Controller
{
   public function generatePDF($id)
   {
        $project = Project::find($id);
        $materialUsed = $this->getMaterialsUsedByProjectId($id);
        $hours = $this->getHoursByProjectId($id);


        $pdf = PDF::loadView('projecteInforme', compact('project', 'materialUsed', 'hours'));
        return $pdf->stream('project.pdf');
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
       return $formattedMaterialsUsed;
   }

   public function getHoursByProjectId( $id)
   {
       
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

           return $mappedHours;
       
   }

}
