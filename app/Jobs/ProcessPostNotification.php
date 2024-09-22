<?php

namespace App\Jobs;

use App\Events\ProcessedNotification;
use App\Models\Post;
use App\Models\PostComment;
use App\Models\SystemNotification;
use App\Notifications\NewPostComment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class ProcessPostNotification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public int $user_id, 
        public Post $post,
        public PostComment $postComment
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Notification::send(
            $this->post->favorites, 
            new NewPostComment($this->post, $this->postComment)
        );

        foreach ($this->post->favorites as $favorite) {
            $systemNotification = SystemNotification::create([
                'user_id' => $favorite->id,
                'title' => "New commentary",
                'content' => __("New commentary added to the post you favorited"),
                'view' => route('posts.show', $this->post->id)
            ]);

            if ($favorite->id == $this->user_id) {
                $processedSystemNotification = $systemNotification;
            }
        }

        ProcessedNotification::dispatch(
            $this->user_id,
            isset($processedSystemNotification) ? $processedSystemNotification : null
        );
    }
}
