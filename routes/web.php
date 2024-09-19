<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiteAdminController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', 'posts');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.update.avatar');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('posts', PostController::class)->except([
        'update', 'edit', 'destroy'
    ]);
    Route::resource('posts', PostController::class)->only([
        'update', 'edit', 'destroy'
    ])->middleware('ownerpost');
    Route::get('/posts-search', [PostController::class, 'search'])->name('posts.search');
    Route::post('/posts/{post}/like', [PostController::class, 'like'])->name('posts.like');
    Route::post('/posts/{post}/favorite', [PostController::class, 'favorite'])->name('posts.favorite');

    Route::post('/comments/{comment}/like', [PostCommentController::class, 'like'])->name('comments.like');

    Route::resource('post-comments', PostCommentController::class)->only([
        'store', 'update', 'destroy'
    ]);

    route::resource('notifications', NotificationController::class)->only([
        'index', 'show', 'destroy'
    ]);
    Route::post('/notifications/{notification}', [NotificationController::class, 'markAsRead'])
        ->name('notifications.markAsRead');
    
    Route::middleware('admin')->group(function () {
        Route::resource('site-admin', SiteAdminController::class);
    });
});

require __DIR__.'/auth.php';