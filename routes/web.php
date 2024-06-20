    <?php

    use App\Http\Controllers\ClientController;
    use App\Http\Controllers\MaterialController;
    use App\Http\Controllers\PdfController;
    use App\Http\Controllers\ProfileController;
    use App\Http\Controllers\ProjectController;
    use App\Http\Controllers\UserController;
    use Illuminate\Foundation\Application;
    use Illuminate\Support\Facades\Route;
    use Inertia\Inertia;
    use App\Models\Project;
    use Illuminate\Http\Request;
    use App\Models\RegistreProjecteUsuari;

    /*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */

    // Route::get('/', function () {
    //     return Inertia::render('Welcome', [
    //         'canLogin' => Route::has('login'),
    //         'canRegister' => Route::has('register'),
    //         'laravelVersion' => Application::VERSION,
    //         'phpVersion' => PHP_VERSION,
    //     ]);
    // });

    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    });

    Route::get('/createProject', function () {
        return Inertia::render('Project/Create');
    })->name('createProject');
    Route::post('/createProject', [ProjectController::class, 'store'])->name('project.store');

    Route::get('/createClient', function () {
        return Inertia::render('Client/Create');
    })->name('createClient');
    Route::get('/home', function () {
        return Inertia::render('Home');
    });

    Route::get('/createMaterial', function () {
        return Inertia::render('Material/Create');
    });
    Route::get('/createProveidor', function () {
        return Inertia::render('Proveidor/Create');
    });
    Route::post('/createClient', [ClientController::class, 'store'])->name('client.store');
    Route::post('/projectView', [ProjectController::class, 'projectView']);

    Route::get('/dashboard', function () {
        return Inertia::render('Home');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('projectView', function (Request $req) {
        $project = Project::find($req->id);
        return Inertia::render('Project/IndexProject', [
            'project' => $project
        ]);
    });

    Route::get('/proveidorsMaterial', function () {
        return Inertia::render('ProveidorsMaterials');
    })->name('proveidorsMaterial');

    Route::get('/proveidors', function () {
        return Inertia::render('Proveidor/Index');
    })->name('proveidors');

    Route::get('/createPdf/{id}', [PdfController::class, 'generatePDF'])->name('createPdf');

    Route::get('/materials', [MaterialController::class, 'index'])->name('materials');
    Route::get('/clients', [ClientController::class, 'index'])->name('clients');
    Route::get('/projects', [ProjectController::class, 'index'])->name('projects');
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/timeTracking', function () {
        return Inertia::render('TimeTracking/Index');
    })->name('timeTracking');



    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });


    require __DIR__ . '/auth.php';
