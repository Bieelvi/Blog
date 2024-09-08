import React from 'react';
import { router } from '@inertiajs/react';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PaginationButton from './PaginationButton';

export default function Pagination({ links, currentPage, lastPage, setCurrentPage, className = '' }) {   
    const handlePageChange = (url) => {
        const pageParam = new URL(url).searchParams.get('page');
        setCurrentPage(pageParam);

        const pageSearch = new URL(window.location.href).searchParams.get('search');
        router.get(url, { preserveState: true, search: pageSearch });
    };

    return (
        <nav className={`flex items-center justify-center gap-x-1 ` + className} aria-label="Pagination">
            <ul className="inline-flex text-sm">
                {links.map((link, index) => (
                    <li key={index}>
                        {link.label == 'pagination.previous' ?
                            <PreviousButton 
                                disabled={currentPage == '1' ? 'disabled' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(link.url);
                                }}
                            />
                        : null}

                        {link.label != 'pagination.previous' && link.label != 'pagination.next' ? 
                            <div className="flex items-center gap-x-1">
                                <PaginationButton 
                                    text={link.label}
                                    className={link.active ? 
                                        'bg-indigo-200 focus:bg-gray-300 dark:bg-indigo-900/50 dark:focus:bg-neutral-500 text-indigo-600' : 
                                        'hover:bg-gray-100 focus:bg-gray-100 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'}
                                    current={link.active ? 'active' : ''}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(link.url);
                                    }}
                                />
                            </div>
                        : null}

                        {link.label == 'pagination.next' ?
                            <NextButton 
                                disabled={currentPage == lastPage ? 'disabled' : ''}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(link.url);
                                }}
                            />
                        : null}
                    </li>
                ))}
            </ul>
        </nav>
    );
};