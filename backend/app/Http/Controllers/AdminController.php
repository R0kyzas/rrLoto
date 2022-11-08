<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderCancelReasonRequest;
use App\Models\Order;
use App\Models\Winner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index()
    {
        $orders = Order::with('tickets')->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function confirmOrder(Order $order)
    {
        if($order->active === 0)
        {
            $order->active = 1;
            $order->save();

            return response()->json([
                'success' => 'success',
            ]);
        }

        return response()->json([
            'error' => 'error',
        ]);
    }
    
    public function cancelOrder(StoreOrderCancelReasonRequest $request, Order $order)
    {
        if($order->active === 0)
        {
            $validated = $request->validated();

            if($validated)
            {
                $order->active = 2;
                $order->update($validated);
                $order->save();
            }
        }
    }

    public function getWinner(){

        $winner = DB::table('tickets')
            ->select('tickets.*')
            ->leftJoin('winners','tickets.id','=','winners.ticket_id')
            ->whereNull('winners.id')
            ->rightJoin('orders', 'orders.id', '=', 'tickets.order_id')
            ->where('orders.active', '=', 1)
            ->orderByRaw('RAND()')
            ->limit(1)
            ->first();

        if(!empty($winner))
        {
            Winner::create([
                'ticket_id' => $winner->id,
            ]);        
               
            return response()->json([
                'success' => true,
                'error' => null,
                'data' => 'Bilieto laimėtojas išrinktas!',
            ]);
        }else{
            return response()->json([
                'success' => false,
                'error' => 'Nėra bilietų kuriems galima būtų priskirti laimėjimą...',
                'data' => null,
            ]);
        }
    }
}
