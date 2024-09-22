<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;

class PostComment extends Model
{
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'user_id',
        'post_id',
        'comment'
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime:Y M j',
            'updated_at' => 'datetime:Y M j'
        ];
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function likes(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'post_comment_likes')
            ->withTimestamps();
    }
}
