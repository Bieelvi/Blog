import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function AvatarForm({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        avatar: null,
        linkAvatar: user.avatar,
        name: user.name,
        _method: 'patch'
    });
    
    const submit = (e) => {
        e.preventDefault();
        
        post('/profile/avatar', {forceFormData: true,});
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Avatar</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Upload/update your avatar
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    To remove the avatar, just save without uploading an avatar
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <img
                        className="mr-4 w-16 h-16 rounded-full"
                        src={ data.linkAvatar ? `/storage/${data.linkAvatar}` : '/storage/default-avatar.png'}
                        alt={ data.name }
                    />
                </div>

                <div>
                    <InputLabel htmlFor="avatar" value="Avatar" />

                    <input 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        id="avatar" 
                        name="avatar"
                        type="file" 
                        onChange={e => setData('avatar', e.target.files[0])}
                    />

                    <InputError className="mt-2" message={errors.avatar} />
                </div>                

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
