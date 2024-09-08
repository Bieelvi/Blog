import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import LeftArrow from '@/Components/LeftArrow';
import Article from '@/Components/Article';

export default function Show({ auth, post }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Posts</h2>}
        >
            <Head title="Posts" />

            <div className="flex py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link href={route('posts.index')}>
                    <LeftArrow
                        id="leftArrow"
                        color="white"
                        height="25px"
                        width="25px"
                        text='Back to list of posts'
                    />
                </Link>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-4 text-gray-900 dark:text-gray-100">
                        <Article
                            auth={auth}
                            postModel={post}
                            show={true}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
