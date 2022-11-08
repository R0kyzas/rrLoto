<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'lastname',
        'token',
        'order_id',
        'ticketNumber',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function winner()
    {
        return $this->hasOne(Winner::class, 'ticket_id');
    }
}
