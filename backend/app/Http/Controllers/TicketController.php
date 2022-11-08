<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Models\Order;
use App\Models\Ticket;
use App\Models\TicketPrice;
use Illuminate\Support\Str;

class TicketController extends Controller
{
    public function index($token)
    {
        $orders = Order::with('tickets')
                        ->whereHas('tickets', function($q) use($token){
                            $q->where('token', '=', $token);
                        })->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    public function getRandomToken()
    {
        do {
            $token = Str::uuid()->toString();
        } while (Ticket::where("token", "=", $token)->first());
        
        return response()->json([
            'token' => $token,
        ]);
    }

    public function getRandomOrderNumber()
    {
        do {
            $orderNumber = Str::random(6);
        } while (Order::where("order_nr", "=", $orderNumber)->first());
        
        return $orderNumber;
    }


    public function generateUniqueTicketNumber()
    {
        do {
            $ticketRandomNumber = random_int(1, 9999);
        } while (Ticket::where("ticketNumber", "=", $ticketRandomNumber)->first());
  
        return $ticketRandomNumber;
    }

    public function getAmount($quantity)
    {
        $ticketPrice = TicketPrice::where('quantity', $quantity)->first();

        return $ticketPrice->price;
    }

    public function store(StoreTicketRequest $request)
    {
        if($request->isMethod('post'))
        {
            try {
                $order = Order::create([
                    $request->validated(),
                    'quantity' => $request->quantity,
                    'order_nr' => $this->getRandomOrderNumber(),
                    'amount' => $this->getAmount($request->quantity),
                ]);
        
                for ($i=0; $i < $request->quantity; $i++) { 
                    Ticket::create([
                        $request->validated(),
                        'order_id' => $order->id,
                        'name' => $request->name,
                        'lastname' => $request->lastname,
                        'token' => $request->token,
                        'ticketNumber' => $this->generateUniqueTicketNumber(),
                    ]);  
                }

                return response()->json([
                    'success' => true,
                    'error' => null,
                    'data' => 'Order successfully submitted! Please show your order number to the administrator to activate the order.',
                    'orderId' => $order->order_nr,
                ], 200);
            } catch (\Exception) {

                return response()->json([
                    'success' => false,
                    'error' => 'Something wrong...',
                    'data' => null,
                ]); 
            }
        }
    }

}
