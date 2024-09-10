import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import ScrollButtonTop from '@/Components/ScrollButtonTop';

export default function Authenticated({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Nav user={user} />

            {header && header}

            <main>{children}</main>

            <ScrollButtonTop />

            <Footer />
        </div>
    );
}
