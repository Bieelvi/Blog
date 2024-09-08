<?php

namespace App\Http\Middleware;

use App\Models\Post;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class OwnerPost
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        preg_match('/\d+/', $request->getPathInfo(), $matches);
        if (count($matches)) {
            $post = Post::with('user')
                ->where('id', $matches[0])
                ->where('user_id', $request->user()->id)
                ->first();

            if (!is_null($post) || in_array($request->user()->role, ['Admin', 'Moderator']))
                return $next($request);
        }

        throw new NotFoundHttpException('Not found');
    }
}
