<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
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

Route::get('/lottery-tickets', [UserController::class, 'index'])->name('lottery.tickets');
Route::post('/admin/get-winner', [AdminController::class, 'getWinner'])->name('get.winner');

Route::get('/payment/{order}', [PaymentController::class, 'makePayment']);
Route::get('/accepted/{query}', [PaymentController::class, 'registredPayment']);
Route::get('/canceled/{query}', [PaymentController::class, 'cancelPayment']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });