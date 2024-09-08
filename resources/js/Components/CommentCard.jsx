import Avatar from "./Avatar";
import LikeHeart from "./LikeHeart";
import Chat from "./Svgs/Chat";

export default function CommentCard({ comment }) {
    return (
        <div className="flex flex-col p-3 my-4 border rounded border-indigo-400">
            <div className="inline-flex items-start mr-3 text-sm text-gray-900 dark:text-white">
                <Avatar user={comment.user} />

                <div className="flex items-center gap-1">
                    <a href="#" rel="author" className="font-bold text-gray-900 dark:text-white">
                        {comment.user.name}
                    </a>

                    <svg fill="rgb(79 70 229)" width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.096 16q0 1.632 1.152 2.784t2.752 1.12 2.752-1.12 1.152-2.784-1.152-2.752-2.752-1.152-2.752 1.152-1.152 2.752z"></path>
                    </svg>

                    <p className="text-gray-500 dark:text-gray-400">
                        {comment.created_at}
                    </p>
                </div>
            </div>

            <div className="py-4">
                {comment.comment}
            </div>

            <div className="flex items-center gap-3">
                <Chat /> 
                <LikeHeart />
            </div>
        </div>
    );
}