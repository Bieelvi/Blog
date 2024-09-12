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
        </div>
    );
}