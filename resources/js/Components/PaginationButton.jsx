export default function PaginationButton({ text, current, className = '', ...props }) {
    return (
        <button
            {...props}
            type="button"
            className={
                `min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none ` + 
                className
            }
            aria-current={current}
        >
            {text}
        </button>
    );
}