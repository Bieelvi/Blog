import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import TextArea from '@/Components/TextArea';
import LeftArrow from '@/Components/LeftArrow';

export default function Edit({ auth, post }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: post.title,
        resume: post.resume,
        article: post.article,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('posts.update', {post: post.id}));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Update - {post.title}</h2>}
        >
            <Head title={"Update " + post.title} />

            <div className="flex py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link href={route('posts.show', { post: post.id })}>
                    <LeftArrow
                        id="leftArrow"
                        color="white"
                        height="25px"
                        width="25px"
                        text='Back to post'
                    />
                </Link>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="title" value="Title" />

                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    maxLength='50'
                                    className="mt-1 block w-full"
                                    required
                                    isFocused={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                />

                                <p className={
                                    "mt-1 text-sm text-right " +
                                    (data.title.length < 50 ? 'text-gray-600 dark:text-gray-400' : 'text-red-600 dark:text-red-400')
                                }>
                                    {data.title.length < 50 ? data.title.length : 50}/50 characters
                                </p>

                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="resume" value="Resume" />

                                <TextArea
                                    id="resume"
                                    name="resume"
                                    rows="2"
                                    value={data.resume}
                                    maxLength='510'
                                    required
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('resume', e.target.value)}
                                />

                                <p className={
                                    "mt-1 text-sm text-right " +
                                    (data.resume.length < 510 ? 'text-gray-600 dark:text-gray-400' : 'text-red-600 dark:text-red-400')
                                }>
                                    {data.resume.length < 510 ? data.resume.length : 510}/510 characters
                                </p>

                                <InputError message={errors.resume} className="mt-2" />
                            </div>

                            <div className='mt-4'>
                                <InputLabel htmlFor="article" value="Article" />

                                <TextArea
                                    id="article"
                                    name="article"
                                    rows="6"
                                    value={data.article}
                                    maxLength='65535'
                                    required
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('article', e.target.value)}
                                />

                                <p className={
                                    "mt-1 text-sm text-right " +
                                    (data.article.length < 65535 ? 'text-gray-600 dark:text-gray-400' : 'text-red-600 dark:text-red-400')
                                }>
                                    {data.article.length < 65535 ? data.article.length : 65535}/65535 characters
                                </p>

                                <InputError message={errors.article} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-start mt-4">
                                <PrimaryButton disabled={processing}>
                                    Edit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
