import { useState } from "react";
import ArrowUp from "./Svgs/ArrowUp";
import { usePage } from "@inertiajs/react";

export default function ScrollButtonTop() {
    const { localeData } = usePage().props;
    const { translate } = localeData;

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
            <ArrowUp text={translate["Arrow up"]} />
        </button>
    );
}