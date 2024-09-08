import Liked from "./Svgs/Liked";
import UnLiked from "./Svgs/UnLiked";

export default function LikeHeart({ liked = false, ...props }) {
    return (
        <div
            className="cursor-pointer"
            {...props}
        >
            {liked ? <Liked /> : <UnLiked />}
        </div>
    );
}