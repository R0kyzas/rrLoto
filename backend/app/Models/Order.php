<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'active',
        'order_nr',
        'quantity',
        'cancel_reason',
        'amount',
    ];

    public function tickets()
    {
        return $this->hasMany(Ticket::class, 'order_id');
    }
}
