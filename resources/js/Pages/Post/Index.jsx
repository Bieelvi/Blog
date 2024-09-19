import Header from '@/Components/Header';
import Pagination from '@/Components/Pagination';
import PlusButton from '@/Components/PlusButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Article from './Article';

export default function Index({ auth, posts }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    const { setData } = useForm({
        page: posts.current_page
    });
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header content={translate['Posts']} />}
        >
            <Head title={translate['Posts']} />

            <div className="flex py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link href={route('posts.create')}>
                    <PlusButton
                        id="plusbutton"
                        color="white"
                        height="25px"
                        width="25px"
                        text={translate['Add new post']}
                    />
                </Link>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 pb-3">
                <div className="bg-white dark:bg-gray-900 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="text-gray-900 dark:text-gray-100">
                        {posts.data.map((post, index) => (
                            <Article
                                className="my-2"
                                key={index}
                                auth={auth}
                                postModel={post}
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

            {posts.data.length >= 1 ?
                <Pagination
                    links={posts.links}
                    currentPage={posts.current_page}
                    lastPage={posts.last_page}
                    setCurrentPage={(page) => setData('page', page)}
                />            
            : null}
        </AuthenticatedLayout>
    );
}
