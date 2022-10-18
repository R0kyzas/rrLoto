<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderCancelReasonRequest;
use App\Models\Order;
use App\Models\Ticket;
use App\Models\Winner;
use Illuminate\Http\Request;

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
        $ticket = Ticket::inRandomOrder()->first();
        
        Winner::create([
            'ticket_winner_id' => $ticket,
        ]);

        return response()->json([
            'success' => 'success', 
        ]);
    }

    public function getTicketsForRoullete(){
        // $ticket = Ticket::select('ticketNumber')->all()->random(1);
        $ticket = Ticket::inRandomOrder()->select('ticketNumber', 'name', 'lastname')->first();
        return response()->json([
            'ticket' => $ticket,
        ]);
    }
}
