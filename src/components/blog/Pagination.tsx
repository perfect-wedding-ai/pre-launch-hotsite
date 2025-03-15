import Link from 'next/link';
import { Locale } from '@/config/i18n.config';
import { translations } from '@/app/[lang]/translations';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  locale: Locale;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, locale, baseUrl }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  // Obter as traduções para o idioma atual
  const lang = locale.split('-')[0] as keyof typeof translations;
  const t = translations[lang] || translations.pt;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  // Determine which page numbers to show
  const pageNumbers = [];
  const maxPagesToShow = 5;

  if (totalPages <= maxPagesToShow) {
    // Show all pages if there are fewer than maxPagesToShow
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Always include first and last page
    pageNumbers.push(1);

    // Calculate the range of pages to show around the current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Adjust if we're near the beginning or end
    if (currentPage <= 2) {
      endPage = 3;
    } else if (currentPage >= totalPages - 1) {
      startPage = totalPages - 2;
    }

    // Add ellipsis if needed
    if (startPage > 2) {
      pageNumbers.push('...');
    }

    // Add the middle pages
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    // Add the last page if not already included
    if (!pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return baseUrl;
    }
    return `${baseUrl}?page=${page}`;
  };

  return (
    <nav className="flex justify-center mt-10" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        {/* Previous page button */}
        {prevPage ? (
          <li>
            <Link
              href={getPageUrl(prevPage)}
              className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-label={`${t.blog.pagination.previous} ${t.blog.pagination.goToPage}`}
            >
              {t.blog.pagination.previous}
            </Link>
          </li>
        ) : (
          <li>
            <span className="px-3 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-400 cursor-not-allowed">
              {t.blog.pagination.previous}
            </span>
          </li>
        )}

        {/* Page numbers */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <li key={`ellipsis-${index}`}>
                <span className="px-3 py-2 text-gray-500">...</span>
              </li>
            );
          }

          const isCurrentPage = page === currentPage;
          return (
            <li key={`page-${page}`}>
              {isCurrentPage ? (
                <span className="px-3 py-2 rounded-md bg-pink-600 text-white text-sm font-medium">
                  {page}
                </span>
              ) : (
                <Link
                  href={getPageUrl(page as number)}
                  className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  aria-label={`${t.blog.pagination.goToPage} ${page}`}
                >
                  {page}
                </Link>
              )}
            </li>
          );
        })}

        {/* Next page button */}
        {nextPage ? (
          <li>
            <Link
              href={getPageUrl(nextPage)}
              className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              aria-label={`${t.blog.pagination.next} ${t.blog.pagination.goToPage}`}
            >
              {t.blog.pagination.next}
            </Link>
          </li>
        ) : (
          <li>
            <span className="px-3 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-400 cursor-not-allowed">
              {t.blog.pagination.next}
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
} 