export default function TextArea({ value, rows, className = '', children, ...props }) {
    return (
        <textarea 
            rows={rows}  
            {...props} 
            className={
                `block p-2.5 w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-indigo-500 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 ` + 
                className
            }
            value={value ? value : children}
        ></textarea>
    );
}
