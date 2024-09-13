import AdminHeader from '@/Components/AdminHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function Index({ auth }) {
    const { localeData } = usePage().props;
    const { translate } = localeData;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<AdminHeader content={translate["Admin"]} />}
        >
            <Head title={translate["Admin"]} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">{translate["You're logged in!"]}</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}