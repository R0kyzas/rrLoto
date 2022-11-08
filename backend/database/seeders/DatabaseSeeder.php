<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\TicketPrice;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::factory()->create([
            'username' => 'admin',
            'password' => Hash::make('admin12345'),
        ]);

        TicketPrice::factory()->create([
            'quantity' => 1,
            'price' => 5,
        ]);

        TicketPrice::factory()->create([
            'quantity' => 5,
            'price' => 20,
        ]);

        TicketPrice::factory()->create([
            'quantity' => 10,
            'price' => 39,
        ]);

        TicketPrice::factory()->create([
            'quantity' => 15,
            'price' => 56,
        ]);

        TicketPrice::factory()->create([
            'quantity' => 20,
            'price' => 70,
        ]);

        TicketPrice::factory()->create([
            'quantity' => 30,
            'price' => 96,
        ]);

        TicketPrice::factory()->create([
            'quantity' => 50,
            'price' => 150,
        ]);

        TicketPrice::factory()->create([
            'quantity' => 100,
            'price' => 260,
        ]);
    }
}
