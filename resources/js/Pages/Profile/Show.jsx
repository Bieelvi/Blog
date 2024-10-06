import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Header from "@/Components/Header";
import { Head, usePage } from '@inertiajs/react';
import Avatar from '@/Components/Avatar';
import Cake from '@/Components/Svgs/Cake';
import Email from '@/Components/Svgs/Email';
import Article from '../Post/Article';
import Chat from '@/Components/Svgs/Chat';
import Paper from '@/Components/Svgs/Paper';
import Hashtag from '@/Components/Svgs/Hashtag';
import UnFavorite from '@/Components/Svgs/Unfavorite';
import UnLiked from '@/Components/Svgs/UnLiked';

export default function Show({ auth, user, posts, favorites, likes, comments }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header content={user.name} />}
        >
            <Head title={translate["Profile"]} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg flex flex-col items-center justify-center">
                        <Avatar user={user} className="w-[90px] lg:w-[130px]" />

                        <div className="flex flex-col items-center dark:text-white pt-5 gap-2">
                            <span className="text-2xl md:text-3xl font-bold">
                                {user.name}
                            </span>

                            <span>
                                {user.about}
                            </span>

                            <div className="flex justify-center md:justify-between items-center flex-wrap gap-3">
                                <span className="flex items-center gap-3"><Cake /> {translate['Joined on']} {user.created_at}</span>
                                <span className="flex items-center gap-3"><Email /> {user.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-gray-900 dark:text-gray-100">
                        <div className="flex flex-col gap-2 p-3 w-full rounded-[10px] my-2 dark:bg-gray-800">
                            <span className="flex items-center justify gap-3"><Paper /> {posts.data.length} {translate['posts published']}</span>
                            <span className="flex items-center justify gap-3"><UnFavorite /> {favorites} {translate['posts favorited']}</span>
                            <span className="flex items-center justify gap-3"><UnLiked /> {likes} {translate['posts liked']}</span>
                            <span className="flex items-center justify gap-3"><Chat /> {comments} {translate['comments written']}</span>
                            <span className="flex items-center justify gap-3"><Hashtag /> 0 {translate['tags followed']}</span>
                        </div>
                    </div>

                    <div className="text-gray-900 dark:text-gray-100 grow">
                        {posts.data.map((post, index) => (
                            <Article
                                className="my-2"
                                key={index}
                                auth={auth}
                                postModel={post}
                                translate={translate}
                            />
                        ))}

                        {posts.data.length == 0 ?
                            <div className="text-center">
                                <span className="mb-4 text-2xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white break-words">
                                    {translate["Not found articles"]}
                                </span>
                            </div>
                            : null}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}