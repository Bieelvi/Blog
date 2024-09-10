import { Link, useForm } from "@inertiajs/react";
import Avatar from "./Avatar";
import LikeHeart from "./LikeHeart";
import Bullet from "./Svgs/Bullet";

export default function CommentCard({ comment }) {
    const { data, setData } = useForm({
        like: comment.liked
    });

    return (
        <div className="flex flex-col p-3 my-4 border rounded border-indigo-400">
            <div className="inline-flex items-start mr-3 text-sm text-gray-900 dark:text-white">
                <Avatar user={comment.user} />

                <div className="flex items-center gap-1">
                    <a href="#" rel="author" className="font-bold text-gray-900 dark:text-white">
                        {comment.user.name}
                    </a>

                    <Bullet />

                    <p className="text-gray-500 dark:text-gray-400">
                        {comment.created_at}
                    </p>
                </div>
            </div>

            <div className="py-4">
                {comment.comment}
            </div>

            <div className="flex items-center gap-3">
                <Link
                    preserveScroll
                    href={route('comments.like', { comment: comment.id })}
                    method='post'
                    as="button"
                >
                    <div className="flex items-center text-sm gap-1">
                        {comment.likes_count}
                        <LikeHeart
                            liked={data.like}
                            onClick={(e) => setData('like', data.like ? false : true)}
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
}