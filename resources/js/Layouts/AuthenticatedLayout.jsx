import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import Notification from '@/Components/Notification';
import ScrollButtonTop from '@/Components/ScrollButtonTop';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Authenticated({ user, header, children }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;
    
    const { flash } = usePage().props;

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
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <Nav user={user} translate={translate} />

            {header && header}

            <main className="flex-1 mr-2 ml-2">
                {children}
            </main>

            {flashMessage && (
                <Notification
                    message={flashMessage}
                    typeMessage={flashType}
                />
            )}

            <ScrollButtonTop />

            <Footer />
        </div>
    );
}
