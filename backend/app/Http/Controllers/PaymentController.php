<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Omnipay\Omnipay;

class PaymentController extends Controller
{
    private $gateway;

    public function __construct()
    {
        $this->gateway = Omnipay::create('Paysera');
        $this->gateway->setProjectId(config('payments.provider.paysera.ID'));
        $this->gateway->setPassword(config('payments.provider.paysera.password'));
    }

    public function makePayment($orderNr)
    {
        $order = Order::where('order_nr', $orderNr)->first();

        if(!$order) abort(404);

        $response = $this->gateway->purchase(
            [
                'transactionId' => $order->order_nr,
                'amount' => $order->amount,
                'currency' => 'EUR',
                'returnUrl' => "http://localhost:3000/profile",
                'cancelUrl' => "http://localhost:3000/cancel?{$orderNr}",
                'notifyUrl' => "http://localhost:3000/accepted",
            ]
        )->send();

        if($response->isRedirect())
        {
            $redirectUrl = config('payments.provider.paysera.url.payment') . '?' . http_build_query([
                'data' => $response->getData()['data'],
                'sign' => $response->getData()['sign'],
            ], null, '&');

            return response($redirectUrl);
        }

        return response()->json([
            'error' => 'Something wrong...',
        ]);
    }


    public function registredPayment($query)
    {
        try {
                
            parse_str(base64_decode($query), $data);
            $order = Order::where('order_nr', $data['orderid'])->first();
            
            $order->active = 1;
            $order->save();

            return response()->json([
                'data' => 'We got payment and active your order!',
                'success' => true,
                'error' => null,
            ], 200);
        } catch (\Exception) {

            return response()->json([
                'success' => false,
                'error' => 'Something wrong...',
                'data' => null,
            ]); 
        }
    }

    public function cancelPayment($query)
    {
        try {
            $order = Order::where('order_nr',$query)->first();
                
            $order->active = 2;
            $order->cancel_reason = 'atšaukė mokėjimą';
            $order->save();

            return response()->json([
                'data' => 'We cancel payment and cancel your order!',
                'success' => true,
                'error' => null,
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
