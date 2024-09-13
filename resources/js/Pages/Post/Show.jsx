import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import LeftArrow from '@/Components/LeftArrow';
import Article from '@/Components/Article';
import Header from '@/Components/Header';

export default function Show({ auth, post, postComments }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header content={post.title} />}
        >
            <Head title={post.title} />

            <div className="flex py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link href={route('posts.index')}>
                    <LeftArrow
                        id="leftArrow"
                        color="white"
                        height="25px"
                        width="25px"
                        text={translate['Back to list of posts']}
                    />
                </Link>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="text-gray-900 dark:text-gray-100">
                        <Article
                            auth={auth}
                            postModel={post}
                            postComments={postComments}
                            show={true}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
