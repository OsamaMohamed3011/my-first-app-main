'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

interface TableHeaderProps {
  onSearch: (query: string) => void;
  onAddClick: () => void;
  isRTL: boolean;
}

export default function TableHeader({ onSearch, onAddClick, isRTL }: TableHeaderProps) {
  const t = useTranslations('table');

  return (
    <div className="flex justify-between items-center px-4 py-3 bg-[#1B4D3E]">
      <div className="flex items-center gap-4">
        <button
          onClick={onAddClick}
          className="bg-[#2D7B52] text-white px-3 py-1.5 text-sm rounded-sm hover:bg-[#236B42] transition-colors"
        >
          {t('createUser')}
        </button>
        <div className="relative">
          <input
            type="text"
            onChange={(e) => onSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={`w-[300px] ${isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-1.5 text-sm border border-[#2D7B52] rounded-sm focus:outline-none focus:border-[#2D7B52] bg-white`}
          />
          <svg
            className={`absolute ${isRTL ? 'right-2.5' : 'left-2.5'} top-1/2 transform -translate-y-1/2 text-gray-400`}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
} 