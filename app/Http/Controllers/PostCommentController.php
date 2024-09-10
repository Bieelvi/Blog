<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCommentRequest;
use App\Models\PostComment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(PostCommentRequest $request): RedirectResponse
    {
        PostComment::create($request->all());

        return back();
    }

    public function like(Request $request, string $id)
    {
        $postComment = PostComment::find($id);
        $postComment->likes()->toggle($request->user()->id);

        return back();
    }
}
