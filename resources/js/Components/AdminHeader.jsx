import PrimaryButton from "./PrimaryButton";

export default function AdminHeader({ content }) {
    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="flex justify-between items-center max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {content}
                </h2>

                <div className="p-1 flex gap-2">
                    <PrimaryButton>
                        oi
                    </PrimaryButton>
                </div>
            </div>
        </header>
    );
}