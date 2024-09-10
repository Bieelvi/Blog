<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\Reaction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $posts = Post::with([
                'user',
                'comments' => ['user'],
                'likes'
            ])
            ->withCount(['likes', 'comments'])
            ->withCount(['likes as liked' => fn($q) => $q->where('user_id', $request->user()->id)])
            ->withCasts(['liked' => 'boolean'])
            ->latest('created_at')
            ->paginate(15);

        return Inertia::render('Post/Index', compact(
            'posts'
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request): RedirectResponse
    {
        Post::create($request->all());

        return Redirect::route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id): Response
    {
        $post = Post::with([
                'user',
                'comments' => ['user'],
                'likes',
                'favorites'
            ])
            ->withCount(['likes', 'comments', 'favorites'])
            ->withCount(['likes as liked' => fn($q) => $q->where('user_id', $request->user()->id)])
            ->withCount(['favorites as favorited' => fn($q) => $q->where('user_id', $request->user()->id)])
            ->withCasts([
                'liked' => 'boolean', 
                'favorited' => 'boolean'
            ])
            ->where('id', $id)
            ->first();

        $postComments = PostComment::with([
                'likes', 
                'user'
            ])
            ->withCount(['likes'])
            ->withCount(['likes as liked' => fn($q) => $q->where('user_id', $request->user()->id)])
            ->withCasts(['liked' => 'boolean'])
            ->wherePostId($post->id)
            ->latest('created_at')
            ->get();
            
        return Inertia::render('Post/Show', compact(
            'post',
            'postComments'
        ));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): Response
    {
        $post = Post::find($id);

        return Inertia::render('Post/Edit', compact(
            'post'
        ));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, string $id): RedirectResponse
    {
        Post::where('id', $id)
            ->update($request->all());

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $post = Post::find($id);

        $post->delete();

        return Redirect::route('posts.index');
    }

    public function search(Request $request): Response
    {
        $search = $request->input('search');

        $posts = Post::with([
                'user',
                'comments' => ['user'],
                'likes'
            ])
            ->withCount(['likes', 'comments'])
            ->withCount(['likes as liked' => fn($q) => $q->where('user_id', $request->user()->id)])
            ->withCasts(['liked' => 'boolean'])
            ->whereFullText(['title', 'resume'], $search)
            ->paginate(15);

        return Inertia::render('Post/Index', compact(
            'posts'
        ));
    }

    public function like(Request $request, string $id): RedirectResponse
    {
        $post = Post::find($id);
        $post->likes()->toggle($request->user()->id);

        return back();
    }

    public function favorite(Request $request, string $id): RedirectResponse
    {
        $post = Post::find($id);
        $post->favorites()->toggle($request->user()->id);

        return back();
    }
}
