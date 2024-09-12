import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Avatar from './Avatar';
import Divisor from './Divisor';
import Bell from './Svgs/Bell';
import SystemNotification from './SystemNotification';

export default function Nav({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            <NavLink href={route('posts.index')} active={route().current('posts.index')}>
                                Posts
                            </NavLink>

                            {user.role == 'Admin' ? 
                                <NavLink href={route('site-admin.index')} active={route().current('site-admin.index')}>
                                    Site admin
                                </NavLink>                            
                                : null}
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <SystemNotification />
                        
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            <Avatar user={user} />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        {user.name}
                                    </Dropdown.Link>

                                    <Divisor />

                                    <Dropdown.Link>
                                        Dashboard
                                    </Dropdown.Link>

                                    <Dropdown.Link>
                                        Notifications
                                    </Dropdown.Link>

                                    <Dropdown.Link href={route('posts.create')}>
                                        Create post
                                    </Dropdown.Link>

                                    <Dropdown.Link>
                                        Settings
                                    </Dropdown.Link>

                                    <Divisor />

                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                        <div className="mr-2">
                            <SystemNotification />
                        </div>

                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('posts.index')} active={route().current('posts.index')}>
                        Posts
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('site-admin.index')} active={route().current('site-admin.index')}>
                        Site Admin
                    </ResponsiveNavLink>
                </div>

                <div className="pb-1 border-t border-gray-200 dark:border-gray-600">
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>
                            {user.name}
                        </ResponsiveNavLink>

                        <Divisor />

                        <ResponsiveNavLink>
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink>
                            Notifications
                        </ResponsiveNavLink>

                        <ResponsiveNavLink href={route('posts.create')}>
                            Create post
                        </ResponsiveNavLink>

                        <ResponsiveNavLink>
                            Settings
                        </ResponsiveNavLink>

                        <Divisor />

                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}