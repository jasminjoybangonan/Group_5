<?php

use App\Http\Controllers\WriterController;
use App\Http\Controllers\EditorController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleSwitchController;
use App\Http\Controllers\ArticleMessageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Temporary cache clearing route
Route::get('/clear-cache', function () {
    \Artisan::call('config:clear');
    \Artisan::call('route:clear');
    \Artisan::call('cache:clear');
    \Artisan::call('view:clear');
    return 'Cache cleared!';
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Writer Routes
Route::middleware(['web', 'auth', 'role:writer'])->prefix('writer')->name('writer.')->group(function () {
    Route::get('/dashboard', [WriterController::class, 'dashboard'])->name('dashboard');
    Route::get('/articles/{article}/edit', [WriterController::class, 'edit'])->name('articles.edit');
    Route::post('/articles', [WriterController::class, 'store'])->name('articles.store');
    Route::put('/articles/{article}', [WriterController::class, 'update'])->name('articles.update');
    Route::delete('/articles/{article}', [WriterController::class, 'destroy'])->name('articles.destroy');
    Route::post('/articles/{article}/submit', [WriterController::class, 'submit'])->name('articles.submit');
    Route::put('/articles/{article}/revise', [WriterController::class, 'revise'])->name('articles.revise');
});

// Editor Routes
Route::middleware(['web', 'auth', 'role:editor'])->prefix('editor')->name('editor.')->group(function () {
    Route::get('/dashboard', [EditorController::class, 'dashboard'])->name('dashboard');
    Route::get('/articles/{article}/review', [EditorController::class, 'review'])->name('articles.review');
    Route::post('/articles/{article}/revision', [EditorController::class, 'requestRevision'])->name('articles.revision');
    Route::post('/articles/{article}/publish', [EditorController::class, 'publish'])->name('articles.publish');
});

// Student Routes
Route::middleware(['web', 'auth', 'role:student'])->prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('dashboard');
    Route::get('/published-articles', [StudentController::class, 'publishedArticles'])->name('published.articles');
    Route::get('/my-comments', [StudentController::class, 'myComments'])->name('my.comments');
    Route::get('/articles/{article}', [StudentController::class, 'show'])->name('articles.show');
    Route::post('/articles/{article}/comment', [StudentController::class, 'comment'])->name('articles.comment');
    Route::delete('/comments/{comment}', [StudentController::class, 'deleteComment'])->name('comments.delete');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Role switching routes
    Route::post('/switch-role/{role}', [RoleSwitchController::class, 'switchRole'])->name('role.switch');

    // Article discussion (editor <-> writer)
    Route::get('/articles/{article}/messages', [ArticleMessageController::class, 'index'])->name('articles.messages.index');
    Route::post('/articles/{article}/messages', [ArticleMessageController::class, 'store'])->name('articles.messages.store');
});

require __DIR__.'/auth.php';

