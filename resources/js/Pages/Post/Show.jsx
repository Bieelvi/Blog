import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import LeftArrow from '@/Components/LeftArrow';
import Header from '@/Components/Header';
import Article from './Article';
import { Button } from '@headlessui/react';

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
                <Button onClick={() => window.history.back()}>
                    <LeftArrow
                        id="leftArrow"
                        color="white"
                        height="25px"
                        width="25px"
                        text={translate['Back']}
                    />
                </Button>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="text-gray-900 dark:text-gray-100">
                        <Article
                            auth={auth}
                            postModel={post}
                            postComments={postComments}
                            show={true}
                            translate={translate}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
