import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import Dropdown from "./Dropdown";
import Bullet from "./Svgs/Bullet";
import Bell from "./Svgs/Bell";
import { Transition } from "@headlessui/react";
import Options from "./Svgs/Options";

export default function SystemNotification({ user }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    const dropdownRef = useRef(null);

    const [open, setOpen] = useState(false);
    const [systemNotifications, setSystemNotifications] = useState(null);
    const [unreads, setUnreads] = useState(0);

    const markAsRead = (id) => {
        axios
            .post(route("notifications.markAsRead", { notification: id }))
            .then(response => {
                const updatedNotifications = systemNotifications.map(notification => {
                    if (notification.id === id) {
                        notification.read_at = true;

                        return notification;
                    }

                    return notification;
                })

                setSystemNotifications(updatedNotifications);
                setUnreads(countUnreads(updatedNotifications));
            });
    };

    const countUnreads = (data) => {
        const response = data.filter(item => item.read_at === null);

        return response.length;
    };

    const getSystemNotifications = () => axios
        .get(route("notifications.index"))
        .then((response) => {
            setSystemNotifications(response.data);
            setUnreads(countUnreads(response.data));
        });

    const webSocketChannel = `Processed.Notification.${user.id}`;

    const connectWebSocket = () => {
        window.Echo.private(webSocketChannel)
            .listen('ProcessedNotification', (e) => {
                if (e.systemNotification !== null) {
                    setSystemNotifications((prevNotifications) => [e.systemNotification, ...prevNotifications]);
                    setUnreads((prevUnreads) => prevUnreads + 1);
                }
            });
    };

    const deleteItem = (id) => {
        axios
            .delete(route("notifications.destroy", { notification: id }))
            .then(response => {
                const updatedNotifications = systemNotifications.filter(notification => notification.id !== id);

                setSystemNotifications(updatedNotifications);
                setUnreads(countUnreads(updatedNotifications));
            });
    };

    useEffect(() => {
        getSystemNotifications();
        connectWebSocket();

        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.Echo.leave(webSocketChannel);
        };
    }, [dropdownRef]);

    return (
        <div ref={dropdownRef} className="relative">
            <div
                className="relative cursor-pointer"
                onClick={(e) => setOpen(!open)}
            >
                <Bell text={translate["Notifications"]} />

                <div className="absolute right-[-7px] top-[-7px] text-white text-[10px] px-[6px] rounded-full bg-red-600 flex items-center justify-center">
                    {unreads > 0 ? unreads > 99 ? `99+` : unreads : ''}
                </div>
            </div>

            <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div
                    className="absolute top-[45px] right-[-40px] md:right-[-90px] w-[300px] z-50 py-2 rounded dark:bg-gray-700 dark:text-white transition duration-150 ease-in-out"
                    style={{ height: 'auto', maxHeight: '91vh', overflowY: 'auto' }}
                >
                    {systemNotifications != null ? systemNotifications.map((systemNotification, index) => (
                        <div key={index} className="break-words pl-4 pr-1 py-3 text-sm hover:bg-gray-800">
                            <span className="flex justify-between dark:text-gray-300 items-center break-words">
                                <Link
                                    href={systemNotification.view}
                                    method='get'
                                    as="button"
                                    className="flex text-left"
                                    onClick={() => markAsRead(systemNotification.id)}
                                >
                                    <span className="flex items-center">
                                        {systemNotification.content}

                                        {systemNotification.read_at == null ?
                                            <Bullet
                                                width="50px"
                                                height="50px"
                                            />
                                            : null}
                                    </span>
                                </Link>

                                <div className="cursor-pointer">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Options text={translate["Configurations"]} />
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <span
                                                className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out cursor-pointer'
                                                onClick={() => markAsRead(systemNotification.id)}
                                            >

                                                {translate["Mark as read"]}
                                            </span>

                                            <span
                                                className='block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out cursor-pointer'
                                                onClick={() => deleteItem(systemNotification.id)}
                                            >

                                                {translate["Delete notification"]}
                                            </span>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </span>
                        </div>
                    )) :
                        <div className="p-2 break-words text-sm rounded">
                            {translate["Without notifications"]}
                        </div>
                    }
                </div>
            </Transition>

        </div>
    );
}