<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)
            ->has(Post::factory()->count(5))
            ->create();

        User::factory()->create([
            'name' => 'Gabriel Victor Raymundo',
            'email' => 'bieelvii13@gmail.com',
            'role' => 'Admin'
        ]);

        User::factory()->create([
            'name' => 'Trevisan Lagrace',
            'email' => 'trevisan@gmail.com',
            'role' => 'Moderator'
        ]);
    }
}
