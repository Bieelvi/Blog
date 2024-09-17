import { Link, usePage } from "@inertiajs/react";
import Bell from "./Svgs/Bell";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Divisor from "./Divisor";

export default function SystemNotification({ user, notifications = [] }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    // const webSocketChannel = `Processed.Notification.${user.id}`;
    
    // const connectWebSocket = () => {
    //     window.Echo.private(webSocketChannel)
    //         .listen('ProcessedNotification', (e) => {
    //             console.log(e);
    //         });
    // }

    // useEffect(() => {
    //     connectWebSocket();

    //     return () => {
    //         window.Echo.leave(webSocketChannel);
    //     }
    // }, []);

    return (
        <div className="ms-3 relative">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full justify-center py-2">
                        <Bell text={translate["Notifications"]} />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="overflow-y-scroll absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    style={{ height: '400px' }}
                >
                    <div className="py-1">
                        {notifications.length > 0 ? notifications.map((notification, index) => (
                            <MenuItem key={index}>
                                <div className="flex flex-col">
                                    <div className="flex justify-between">
                                        <span className="break-words block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                            New
                                        </span>
                                    </div>

                                    <Link
                                        href="#"
                                        // method='post'
                                        // as="button"
                                        className="flex"
                                    >
                                        <span className="break-words block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                                            {/* {notification.data.postComment.comment} */}
                                        </span>
                                    </Link>

                                    <Divisor />
                                </div>
                            </MenuItem>
                        )) :
                            <MenuItem>
                                <a>
                                    Without notifications
                                </a>
                            </MenuItem>
                        }
                    </div>
                </MenuItems>
            </Menu>
        </div>
    );
}