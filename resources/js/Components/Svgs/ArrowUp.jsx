export default function ArrowUp({ text = 'Arrow up' }) {
    return (
        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>{text}</title>
            <path 
                d="M12 6V18M12 6L7 11M12 6L17 11" 
                stroke="rgb(79 70 229)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
        </svg>
    )
}