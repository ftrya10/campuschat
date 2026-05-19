<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| DASHBOARD
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return redirect('/');
})->name('dashboard');

/*
|--------------------------------------------------------------------------
| CHAT APP
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/', function () {

        return Inertia::render('Chat', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);

    });

    Route::get('/chat/messages', [ChatController::class, 'getMessages']);

    Route::post('/chat/send', [ChatController::class, 'sendMessage']);

    Route::get('/chat/users', [ChatController::class, 'getUsers']);

    /*
    |--------------------------------------------------------------------------
    | LOGOUT
    |--------------------------------------------------------------------------
    */

    Route::post('/logout', function (Request $request) {

        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logout berhasil'
        ]);

    });

});