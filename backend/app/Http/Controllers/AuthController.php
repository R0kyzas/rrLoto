<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Session\Session;

class AuthController extends Controller
{
    private $apiToken;
    public function __construct()
    {
        $this->apiToken = uniqid(base64_encode(Str::random(40)));
    }

    public function login(StoreLoginRequest $request,){ 

        if(Auth::attempt(['username' => $request->username, 'password' => $request->password]))
        { 
            $user = Auth::user(); 
            // $session = session(['loggedIn' => $this->apiToken]);
            // $sessionRequest->session()->put('loggedIn', $this->apiToken);
            // $request->session()->set('test', 'test');
            // $success['username'] =  $user->username;

            return response()->json([
                'status' => 'success',
                'token' => $this->apiToken,
            ]); 
        } else { 
            return response()->json([
                'status' => 'error',
                'data' => 'Unauthorized Access'
            ]); 
        } 
      }
}
