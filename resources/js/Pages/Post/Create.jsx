import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import TextArea from '@/Components/TextArea';
import LeftArrow from '@/Components/LeftArrow';
import { useRef } from 'react';
import EditorTinyMCE from '@/Components/EditorTinyMCE';
import Header from '@/Components/Header';

export default function Create({ auth }) {
    const editorRef = useRef();

    const { data, setData, post, processing, errors } = useForm({
        user_id: auth.user.id,
        title: '',
        resume: '',
        article: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('posts.store'));
    };

    const setArticle = () => {
        setData('article', editorRef.current.getContent());
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<Header content="Create new post" />}
        >
            <Head title="Create new post" />

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

                                <div className="mt-1 block w-full">
                                    <EditorTinyMCE
                                        editorRef={editorRef}
                                        value={data.article}
                                        id="article"
                                    />
                                </div>

                                <p className={
                                    "mt-1 text-sm text-right " +
                                    (data.article.length < 65535 ? 'text-gray-600 dark:text-gray-400' : 'text-red-600 dark:text-red-400')
                                }>
                                    {data.article.length < 65535 ? data.article.length : 65535}/65535 characters
                                </p>

                                <InputError message={errors.article} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <PrimaryButton onClick={setArticle} disabled={processing}>
                                    Create
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
