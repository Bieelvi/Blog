export default function LeftArrow({ id, color, height, width, text = '' }) {
    return (
        <svg id={id} width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <title>{text}</title>

            <path 
                d="M4 12H20M4 12L8 8M4 12L8 16"
                stroke={color}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
            />
        </svg>
    );
}
