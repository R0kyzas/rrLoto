<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_winner_id',
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
