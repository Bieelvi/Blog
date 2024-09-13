import { usePage } from "@inertiajs/react";
import Favorite from "./Svgs/Favorite";
import UnFavorite from "./Svgs/Unfavorite";

export default function LikeFavorite({ favorited = false, ...props }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    return (
        <div
            className="cursor-pointer"
            {...props}
        >
            {favorited ? <Favorite text={translate["Unfavorite"]} /> : <UnFavorite text={translate["Favorite"]} />}
        </div>
    );
}