import Success from "./Svgs/Success";
import Error from "./Svgs/Error";
import Warning from "./Svgs/Warning";

export default function Notification({ message = '', typeMessage = '' }) {
    return (
        <div
            style={{ position: 'fixed', bottom: '10px', left: '40px' }}
            id="toast-success"
            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-900"
            role="alert"
        >
            {
                {
                    'success': <Success />,
                    'error': <Error />,
                    'warning': <Warning />
                }[typeMessage]                
            }

            <div className="ms-3 text-sm font-normal">{message}</div>

            <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success"
                aria-label="Close"
                // onClick={closeNotification}
            >
                <span className="sr-only">
                    Close
                </span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    );
}