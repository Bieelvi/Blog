import Profile from "@/Components/Svgs/Profile";
import UnFavorite from "@/Components/Svgs/Unfavorite";
import { Link } from "@inertiajs/react";

export default function ProfileHeader({ translate }) {
    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="flex items-center gap-4 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
                <Link 
                    className={`flex items-center gap-1 hover:text-indigo-600 
                        ${route().current('profile.edit') && 'text-indigo-600'}
                    `}
                    href={route('profile.edit')}
                >
                    <Profile /> {translate['Profile']}
                </Link>

                <Link 
                    className={`flex items-center gap-1 hover:text-indigo-600 
                        ${route().current('posts.favorites') && 'text-indigo-600'}
                    `}
                    href={route('posts.favorites')}
                >
                    <UnFavorite /> {translate['Favorites']}
                </Link>
            </div>
        </header>
    );
}