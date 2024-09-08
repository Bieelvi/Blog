<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCommentRequest;
use App\Models\PostComment;
use Illuminate\Http\RedirectResponse;

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
}
