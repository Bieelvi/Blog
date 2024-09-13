export default function PlusButton({ id, color, height, width, text = 'Plus' }) {
    return (
        <svg id={id} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <title>{text}</title>

            <path 
                d="M6 12H18M12 6V18" 
                stroke={color}   
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
        </svg>
    );
}
