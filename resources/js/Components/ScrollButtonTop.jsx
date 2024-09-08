import { useState } from "react";
import ArrowUp from "./Svgs/ArrowUp";

export default function ScrollButtonTop() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;

        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <button
            className="bg-white rounded-[10px]"
            style={{ display: visible ? 'inline' : 'none', position: 'fixed', bottom: '50px', right: '50px' }}
            onClick={scrollToTop}
        >
            <ArrowUp />
        </button>
    );
}