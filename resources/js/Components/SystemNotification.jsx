import { usePage } from "@inertiajs/react";
import Dropdown from "./Dropdown";
import Bell from "./Svgs/Bell";

export default function SystemNotification() {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    return (
        <div className="ms-3 relative">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center p-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                        >
                            <Bell text={translate["Notifications"]} />
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content className="overflow-scroll">
                    <Dropdown.Link className="break-words">
                        testesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsd
                    </Dropdown.Link>
                    <Dropdown.Link className="break-words">
                        testesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsd
                    </Dropdown.Link>
                    <Dropdown.Link className="break-words">
                        testesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsd
                    </Dropdown.Link>
                    <Dropdown.Link className="break-words">
                        testesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsd
                    </Dropdown.Link>
                    <Dropdown.Link className="break-words">
                        testesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsdtestesdfsd
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    );
}