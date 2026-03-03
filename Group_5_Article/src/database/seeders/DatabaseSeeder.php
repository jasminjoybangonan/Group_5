<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Revision;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
            ArticleStatusSeeder::class,
            UserSeeder::class,
        ]);

        // Create sample articles
        Article::factory()
            ->count(5)
            ->draft()
            ->create();

        Article::factory()
            ->count(3)
            ->submitted()
            ->create();

        Article::factory()
            ->count(2)
            ->needsRevision()
            ->has(Revision::factory()->count(1))
            ->create();

        Article::factory()
            ->count(10)
            ->published()
            ->has(Comment::factory()->count(rand(1, 5)))
            ->create();
    }
}
