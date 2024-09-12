<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCommentRequest;
use App\Models\Post;
use App\Models\PostComment;
use App\Notifications\NewPostComment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Redirect;

class PostCommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(PostCommentRequest $request): RedirectResponse
    {
        $postComment = PostComment::create($request->all());

        $post = Post::find($postComment->post_id);
        Notification::send(
            $post->favorites, 
            new NewPostComment($post, $postComment)
        );

        return Redirect::back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostCommentRequest $request, string $id): RedirectResponse
    {
        PostComment::where('id', $id)
            ->update($request->all());

        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $postComment = PostComment::find($id);

        $postComment->delete();

        return Redirect::back();
    }

    public function like(Request $request, string $id): RedirectResponse
    {
        $postComment = PostComment::find($id);
        $postComment->likes()->toggle($request->user()->id);

        return Redirect::back();
    }
}
