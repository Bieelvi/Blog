import { Link, useForm, usePage } from "@inertiajs/react";
import Avatar from "./Avatar";
import LikeHeart from "./LikeHeart";
import Bullet from "./Svgs/Bullet";
import Gear from "./Svgs/Gear";
import Dropdown from "./Dropdown";
import { useState } from "react";
import Modal from "./Modal";
import SecondaryButton from "./SecondaryButton";
import DangerButton from "./DangerButton";
import TextInput from "./TextInput";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";

export default function CommentCard({ auth, commentary }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    const [confirmingCommentaryDeletion, setConfirmingCommentaryDeletion] = useState(false);
    const [ editingCommentary, setEditingCommentary ] = useState(false);

    const { data, setData, patch, delete: destroy, errors, processing } = useForm({
        comment: commentary.comment,
        post_id: commentary.post_id,
        user_id: commentary.user.id
    });

    const confirmPostDeletion = () => {
        setConfirmingCommentaryDeletion(true);
    };

    const deleteCommentary = (e) => {
        e.preventDefault();

        destroy(route('post-comments.destroy', { post_comment: commentary.id }), {
            onSuccess: () => closeModal()
        });
    };

    const closeModal = () => {
        setConfirmingCommentaryDeletion(false);
    };

    const editCommentary = () => {
        setEditingCommentary(true);
    }

    const submit = (e) => {
        e.preventDefault();

        patch(route('post-comments.update', { post_comment: commentary.id }), {
            preserveScroll: true,
            onFinish: () => { 
                setEditingCommentary(false); 
            },
        });
    };

    const allowOptions = auth.user.id == commentary.user.id || ['Admin', 'Moderator'].includes(auth.user.role);

    return (
        <div className="flex flex-col p-3 my-4 border rounded border-indigo-400">
            <div className="flex justify-between items-start text-sm text-gray-900 dark:text-white">
                <div className="inline-flex items-start">
                    <Avatar user={commentary.user} />

                    <div className="flex items-center gap-1">
                        <a href="#" rel="author" className="font-bold text-gray-900 dark:text-white">
                            {commentary.user.name}
                        </a>

                        <Bullet />

                        <p className="text-gray-500 dark:text-gray-400">
                            {commentary.created_at}
                        </p>
                    </div>
                </div>

                {allowOptions ?
                    <Dropdown>
                        <Dropdown.Trigger>
                            <span className="inline-flex rounded-md">
                                <button
                                    type="button"
                                    className="inline-flex items-center border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <Gear text={translate["Configurations"]} />
                                </button>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <span
                                className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out cursor-pointer'
                                onClick={editCommentary}
                            >
                                {translate["Edit"]}
                            </span>

                            <span
                                className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out cursor-pointer'
                                onClick={confirmPostDeletion}
                            >
                                {translate["Delete"]}
                            </span>
                        </Dropdown.Content>
                    </Dropdown>
                    : null}
            </div>

            <div className="py-4">
                {editingCommentary ?
                    <form onSubmit={submit} className="mt-1 space-y-3">
                        <div>
                            <TextInput
                                id="comment"
                                name="comment"
                                value={data.comment}
                                required
                                type="text"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('comment', e.target.value)}
                            />

                            <InputError message={errors.comment} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>{translate["Edit commentary"]}</PrimaryButton>
                        </div>
                    </form>
                    : data.comment }
            </div>

            <div className="flex justify-between items-center gap-3">
                <Link
                    preserveScroll
                    href={route('comments.like', { comment: commentary.id })}
                    method='post'
                    as="button"
                >
                    <div className="flex items-center text-sm gap-1">
                        <LikeHeart
                            liked={commentary.liked}
                        />
                        {commentary.likes_count}
                    </div>
                </Link>
                
                <span className="text-gray-500 dark:text-gray-400">
                    {commentary.created_at != commentary.updated_at ? `${translate["edited at"]} ${commentary.updated_at}` : null}
                </span>
            </div>

            <Modal show={confirmingCommentaryDeletion} onClose={closeModal}>
                <form onSubmit={deleteCommentary} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {translate["Are you sure you want to delete your commentary?"]}
                    </h2>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>{translate["Cancel"]}</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            {translate["Delete commentary"]}
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}