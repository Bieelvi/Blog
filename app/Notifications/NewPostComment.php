<?php

namespace App\Notifications;

use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewPostComment extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Post $post,
        public PostComment $postComment
    ) {
        $this->post = $post;
        $this->postComment = $postComment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $postUrl = url("/posts/{$this->post->id}");

        return (new MailMessage)
            ->greeting('Hello, dear.')
            ->line('A new comment has been added to the post.')
            ->action("View post {$this->post->title}", $postUrl)
            ->line($this->postComment->comment)
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [];
    }
}
