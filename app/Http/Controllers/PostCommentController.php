<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCommentRequest;
use App\Jobs\ProcessPostNotification;
use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        
        ProcessPostNotification::dispatch(
            $request->user()->id, 
            $post,
            $postComment
        );

        return Redirect::back()->with([
            'message' => __("Commentary added successfully"),
            'type' => 'success'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostCommentRequest $request, string $id): RedirectResponse
    {
        PostComment::where('id', $id)
            ->update($request->all());

        return Redirect::back()->with([
            'message' => __("Commentary edited successfully"),
            'type' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $postComment = PostComment::find($id);

        $postComment->delete();

        return Redirect::back()->with([
            'message' => __("Commentary deleted successfully"),
            'type' => 'success'
        ]);
    }

    public function like(Request $request, string $id): RedirectResponse
    {
        $postComment = PostComment::find($id);
        $postComment->likes()->toggle($request->user()->id);

        return Redirect::back()->with([
            'message' => __("Commentary liked/unliked successfully"),
            'type' => 'success'
        ]);
    }
}
