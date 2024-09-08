import Article from '@/Components/Article';
import Pagination from '@/Components/Pagination';
import PlusButton from '@/Components/PlusButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, posts }) {
    const { setData } = useForm({
        page: posts.current_page
    });
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Posts</h2>}
        >
            <Head title="Posts" />

            <div className="flex py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link href={route('posts.create')}>
                    <PlusButton
                        id="plusbutton"
                        color="white"
                        height="25px"
                        width="25px"
                        text="Add new post"
                    />
                </Link>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-3">
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="text-gray-900 dark:text-gray-100">
                        {posts.data.map((post, index) => (
                            <Article
                                key={index}
                                auth={auth}
                                postModel={post}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Pagination
                links={posts.links}
                currentPage={posts.current_page}
                lastPage={posts.last_page}
                setCurrentPage={(page) => setData('page', page)}
            />
        </AuthenticatedLayout>
    );
}
