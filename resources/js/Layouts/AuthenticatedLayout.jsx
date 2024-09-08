import Footer from '@/Components/Footer';
import Nav from '@/Components/Nav';
import ScrollButtonTop from '@/Components/ScrollButtonTop';
import SearchInput from '@/Components/SearchInput';

export default function Authenticated({ user, header, children }) {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Nav user={user} />

            {header && (
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="flex justify-between items-center max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                        <SearchInput />
                    </div>
                </header>
            )}

            <main>{children}</main>

            <ScrollButtonTop />

            <Footer />
        </div>
    );
}
