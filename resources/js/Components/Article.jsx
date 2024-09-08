import { useState } from 'react';
import { Link, useForm } from "@inertiajs/react";
import RightArrow from "./RightArrow";
import Avatar from "./Avatar";
import parse from 'html-react-parser';
import Dropdown from '@/Components/Dropdown';
import Modal from './Modal';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
import TextInput from './TextInput';
import PrimaryButton from './PrimaryButton';
import { Transition } from '@headlessui/react';
import InputError from './InputError';
import CommentCard from './CommentCard';
import LikeHeart from './LikeHeart';
import Chat from './Svgs/Chat';
import ArrowDown from './Svgs/ArrowDown';
import Liked from './Svgs/Liked';

export default function Article({ auth, postModel, show = false }) {
    const [confirmingPostDeletion, setConfirmingPostDeletion] = useState(false);
    const [postComment, setPostComment] = useState(false);

    const { data, setData, post, reset, delete: destroy, errors, processing, recentlySuccessful } = useForm({
        comment: '',
        like: postModel.liked,
        post_id: postModel.id,
        user_id: auth.user.id
    });

    const confirmPostDeletion = () => {
        setConfirmingPostDeletion(true);
    };

    const postCommenting = () => {
        setPostComment(postComment ? false : true);
    };

    const deletePost = (e) => {
        e.preventDefault();

        destroy(route('posts.destroy', { post: postModel.id }), {
            preserveScroll: true,
            onSuccess: () => closeModal()
        });
    };

    const closeModal = () => {
        setConfirmingPostDeletion(false);
    };

    const allowOptions = auth.user.id == postModel.user.id || ['Admin', 'Moderator'].includes(auth.user.role);

    const submit = (e) => {
        e.preventDefault();

        post(route('post-comments.store'), {
            preserveScroll: true,
            onFinish: () => { reset('comment') },
        });
    };

    return (
        <article className="my-2 p-4 w-full rounded-[10px] dark:bg-gray-800 max-w-6xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <div className="mb-4 lg:mb-6 not-format">
                <div className="flex items-center justify-between mb-6 not-italic">
                    <div className="inline-flex items-start mr-3 text-sm text-gray-900 dark:text-white">
                        <Avatar user={postModel.user} />
                        <div>
                            <a href="#" rel="author" className="font-bold text-gray-900 dark:text-white">
                                {postModel.user.name}
                            </a>
                            <p className="text-gray-500 dark:text-gray-400">
                                {postModel.created_at}
                            </p>
                        </div>
                    </div>

                    <div>
                        {allowOptions ?
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <ArrowDown />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('posts.edit', { post: postModel.id })}>
                                        Edit
                                    </Dropdown.Link>
                                    <span
                                        className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out cursor-pointer'
                                        onClick={confirmPostDeletion}
                                    >
                                        Delete
                                    </span>
                                </Dropdown.Content>
                            </Dropdown>
                            : null}
                    </div>
                </div>

                <h3 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white break-words">
                    {postModel.title}
                </h3>
            </div>

            <div>
                <div className='text-1xl leading-tight text-gray-900 lg:mb-6 lg:text-1xl dark:text-white break-words'>
                    {postModel.resume}
                </div>

                {show ?
                    <div className="my-4 leading-tight text-gray-900 lg:mb-6 lg:text-1xl dark:text-white break-words">
                        {parse(postModel.article)}
                    </div>
                    : null}
            </div>

            <div>
                {!show ?
                    <div className='flex justify-between mt-4'>
                        <div className="flex justify item-center gap-1">
                            <div className="flex items-center text gap-1 text-sm">
                                {postModel.comments_count}
                                <Chat />
                            </div>

                            <div className="flex items-center text gap-1 text-sm">
                                {postModel.likes_count}
                                <Liked />
                            </div>
                        </div>
                        <Link className="flex font-bold text-indigo-600 gap-1" href={route("posts.show", postModel.id)}>
                            Read article
                            <RightArrow
                                className="font-bold text-indigo-600"
                                id="rightarrow"
                                color="rgb(79 70 229)"
                                height="25px"
                                width="25px"
                            />
                        </Link>
                    </div>
                    : null}

                {show ?
                    <div className="flex items-center gap-3">
                        <div className="flex items-center text gap-1 text-sm cursor-pointer" onClick={postCommenting}>
                            {postModel.comments_count}
                            <Chat />
                        </div>

                        <Link
                            preserveScroll
                            href={route('posts.like', { post: data.post_id })}
                            method='post'
                            as="button"
                        >
                            <div className="flex items-center text-sm gap-1">
                                {postModel.likes_count}
                                <LikeHeart
                                    liked={data.like}
                                    onClick={(e) => setData('like', data.like ? false : true)}
                                />
                            </div>
                        </Link>

                    </div>
                    : null}
            </div>

            {postComment ?
                <form onSubmit={submit} className="mt-1 space-y-3">
                    <div>
                        <TextInput
                            id="comment"
                            name="comment"
                            value={data.comment}
                            required
                            type="text"
                            className="mt-1 block w-full"
                            placeholder="Write your comment"
                            onChange={(e) => setData('comment', e.target.value)}
                        />

                        <InputError message={errors.comment} className="mt-2" />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>Comment</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">Commented.</p>
                        </Transition>
                    </div>
                </form>
                : null}

            {show && postModel.comments.map((c, index) => (
                <CommentCard
                    comment={c}
                    key={index}
                />
            ))}

            <Modal show={confirmingPostDeletion} onClose={closeModal}>
                <form onSubmit={deletePost} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your post?
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Post
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </article>
    );
}