'use client';

import { useTranslations } from 'next-intl';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isRTL: boolean;
}

export default function TablePagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isRTL 
}: TablePaginationProps) {
  const t = useTranslations('table.pagination');
  const maxPages = Math.min(10, totalPages);

  // Handle page input change
  const handlePageInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.currentTarget;
      const page = parseInt(input.value);
      if (!isNaN(page) && page >= 1 && page <= maxPages) {
        onPageChange(page);
      }
      input.value = currentPage.toString();
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {/* First Page Button */}
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-full ${
              currentPage === 1
                ? 'text-secondary-main cursor-not-allowed bg-secondary-light'
                : 'text-white hover:bg-success-main bg-info-dark'
            } w-8 h-8 flex items-center justify-center transition-colors`}
            title={t('firstPage')}
          >
            <FaAngleDoubleLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          {/* Previous Page Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-1.5 rounded-full ${
              currentPage === 1
                ? 'text-secondary-main cursor-not-allowed bg-secondary-light'
                : 'text-white hover:bg-success-main bg-info-dark'
            } w-8 h-8 flex items-center justify-center transition-colors`}
          >
            <FaAngleLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          {/* Next Page Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === maxPages}
            className={`p-1.5 rounded-full ${
              currentPage === maxPages
                ? 'text-secondary-main cursor-not-allowed bg-secondary-light'
                : 'text-white hover:bg-success-main bg-info-dark'
            } w-8 h-8 flex items-center justify-center transition-colors`}
          >
            <FaAngleRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>

          {/* Last Page Button */}
          <button
            onClick={() => onPageChange(maxPages)}
            disabled={currentPage === maxPages}
            className={`p-1.5 rounded-full ${
              currentPage === maxPages
                ? 'text-secondary-main cursor-not-allowed bg-secondary-light'
                : 'text-white hover:bg-success-main bg-info-dark'
            } w-8 h-8 flex items-center justify-center transition-colors`}
            title={t('lastPage')}
          >
            <FaAngleDoubleRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Page Input */}
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium text-info-dark whitespace-nowrap">
            {t('page')} {currentPage} {t('of')} {maxPages} {t('goTo')}
          </div>
          <input
            type="text"
            defaultValue={currentPage}
            onKeyDown={handlePageInput}
            onFocus={(e) => e.target.select()}
            className="w-[40px] py-1 text-sm border border-success-main rounded-sm focus:outline-none focus:border-success-dark bg-white text-center"
          />
        </div>
      </div>
    </div>
  );
} 