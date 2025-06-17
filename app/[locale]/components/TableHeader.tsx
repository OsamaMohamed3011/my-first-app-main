'use client';

import { useTranslations } from 'next-intl';
import { FaSearch } from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';

interface TableHeaderProps {
  onSearch: (value: string) => void;
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
          <FaSearch
            className={`absolute ${isRTL ? 'right-2.5' : 'left-2.5'} top-1/2 transform -translate-y-1/2 text-gray-400 w-3.5 h-3.5`}
          />
        </div>
        <LanguageSwitcher />
      </div>
    </div>
  );
} 