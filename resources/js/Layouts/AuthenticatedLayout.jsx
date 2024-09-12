import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import Notification from '@/Components/Notification';
import ScrollButtonTop from '@/Components/ScrollButtonTop';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Authenticated({ user, header, children }) {
    const { flash } = usePage().props

    const [flashMessage, setFlashMessage] = useState(null);
    const [flashType, setFlashType] = useState(null);

    useEffect(() => {
        if (flash?.message) {
            setFlashMessage(flash.message);
            setFlashType(flash.type);

            const timer = setTimeout(() => {
                setFlashMessage(null);
                setFlashType(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Nav user={user} />

            {header && header}

            <main>
                {flashMessage && (
                    <Notification
                        message={flashMessage}
                        typeMessage={flashType}
                    />
                )}

                {children}
            </main>

            <ScrollButtonTop />

            <Footer />
        </div>
    );
}
