export default function BellSlash({ text = 'Disabled notification' }) {
    return (
        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <title>{text}</title>
            <path 
                d="M3 3L21 21M9.37747 3.56325C10.1871 3.19604 11.0827 3 12 3C13.5913 3 15.1174 3.59 16.2426 4.6402C17.3679 5.69041 18 7.11479 18 8.6C18 10.3566 18.2892 11.7759 18.712 12.9122M17 17H15M6.45339 6.46451C6.15686 7.13542 6 7.86016 6 8.6C6 11.2862 5.3238 13.1835 4.52745 14.4866C3.75616 15.7486 3.37051 16.3797 3.38485 16.5436C3.40095 16.7277 3.43729 16.7925 3.58603 16.9023C3.71841 17 4.34762 17 5.60605 17H9M9 17V18C9 19.6569 10.3431 21 12 21C13.6569 21 15 19.6569 15 18V17M9 17H15" 
                stroke="rgb(79 70 229)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" />
        </svg>
    );
}