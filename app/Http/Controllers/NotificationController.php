<?php

namespace App\Http\Controllers;

use App\Models\PostComment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class NotificationController extends Controller
{
    public function index() 
    {
        $postComments = PostComment::with('notifications')
            ->whereUserId(Auth::user()->id)
            ->get();

        return $postComments;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {     
        

        return Redirect::back()->with([
            'message' => __("Notification deleted successfully"),
            'type' => 'warning'
        ]);
    }

    public function markAsRead(string $id): RedirectResponse
    {
        

        return Redirect::back()->with([
            'message' => __("Notification readed"),
            'type' => 'warning'
        ]);
    }
}
