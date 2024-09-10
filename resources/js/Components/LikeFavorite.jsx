import Favorite from "./Svgs/Favorite";
import UnFavorite from "./Svgs/Unfavorite";

export default function LikeFavorite({ favorited = false, ...props }) {
    return (
        <div
            className="cursor-pointer"
            {...props}
        >
            {favorited ? <Favorite /> : <UnFavorite />}
        </div>
    );
}