import { usePage } from "@inertiajs/react";
import Liked from "./Svgs/Liked";
import UnLiked from "./Svgs/UnLiked";

export default function LikeHeart({ liked = false, ...props }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    return (
        <div
            className="cursor-pointer"
            {...props}
        >
            {liked ? <Liked text={translate["Unliked"]} /> : <UnLiked text={translate["Liked"]} />}
        </div>
    );
}