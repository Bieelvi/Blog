<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id): Response
    {
        $user = User::find($id);

        $posts = Post::with([
                'user',
                'comments' => ['user'],
                'likes'
            ])
            ->withCount(['likes', 'comments'])
            ->withCount(['likes as liked' => fn($q) => $q->where('user_id', $user->id)])
            ->withCasts(['liked' => 'boolean'])
            ->where('user_id', $user->id)
            ->latest('created_at')
            ->paginate(15);

        $favorites = Post::with(['favorites'])
            ->withCount(['favorites' => fn($q) => $q->where('user_id', $user->id)])
            ->whereHas('favorites', fn($q) => $q->where('user_id', $user->id))
            ->count();

        $likes = Post::with(['likes'])
            ->withCount(['likes' => fn($q) => $q->where('user_id', $user->id)])
            ->whereHas('likes', fn($q) => $q->where('user_id', $user->id))
            ->count();

        $postsComment = Post::with(['comments'])
            ->withCount(['comments' => fn($q) => $q->where('user_id', $user->id)])
            ->whereHas('comments', fn($q) => $q->where('user_id', $user->id))
            ->get();

        $comments = 0;
        foreach ($postsComment as $postComment) {
            $comments += $postComment->comments->count();
        }
            
        return Inertia::render('Profile/Show', compact(
            'user',
            'posts',
            'favorites',
            'likes',
            'comments'
        ));
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with([
            'message' => __("User edited successfully"),
            'type' => 'success'
        ]);;
    }

    /**
     * Update the avatar profile.
     */
    public function updateAvatar(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:6144']
        ]);
        
        $path = $request->user()->avatar;

        $request->user()->fill($validated);

        if (!is_null($path) && Storage::exists($path)) {
            Storage::delete($path);
        }

        if ($request->file('avatar')) {
            $path = Storage::put('avatars', $request->file('avatar'));
            $request->user()->avatar = $path;
        }

        $request->user()->save();

        return Redirect::route('profile.edit')->with([
            'message' => __("Avatar edited successfully"),
            'type' => 'success'
        ]);;
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/')->with([
            'message' => __("User deleted successfully"),
            'type' => 'success'
        ]);;
    }
}
