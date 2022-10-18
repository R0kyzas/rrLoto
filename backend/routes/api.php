<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TicketBasketController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/ticket', [TicketController::class, 'store'])->name('ticket.store');
Route::get('/ticket-list/{token}', [TicketController::class, 'index'])->name('ticket.index');
Route::get('/token', [TicketController::class, 'getRandomToken'])->name('ticket.get.token');
Route::get('/ticket-numbers', [TicketController::class, 'getTicketNumbers'])->name('ticket.get.numbers');


Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/admin', [AdminController::class, 'index'])->name('admin');

Route::post('/admin/confirm/{order}', [AdminController::class, 'confirmOrder'])->name('order.confirm');
Route::post('/admin/cancel/{order}', [AdminController::class, 'cancelOrder'])->name('order.confirm');

Route::get('/lottery-tickets', [AdminController::class, 'getTicketsForRoullete'])->name('lottery.tickets');

Route::post('/admin/get-winner', [AdminController::class, 'getWinner'])->name('get.winner');

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// require __DIR__.'/auth.php';