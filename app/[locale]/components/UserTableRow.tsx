'use client';

import { useTranslations } from 'next-intl';
import { User } from '@/app/types';

interface UserTableRowProps {
  user: User;
  index: number;
  onEdit: (id: number) => void;
}

export default function UserTableRow({ user, index, onEdit }: UserTableRowProps) {
  const t = useTranslations('table');

  return (
    <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F5F9F7]'} hover:bg-[#E8F1ED] transition-colors`}>
      <td className="px-4 py-2 text-sm border-x border-b border-[#E8F1ED] text-center">
        {user.accountNumber}
      </td>
      <td className="px-4 py-2 text-sm border-x border-b border-[#E8F1ED] text-center">
        {`${user.firstName} ${user.lastName}`}
      </td>
      <td className="px-4 py-2 text-sm border-x border-b border-[#E8F1ED] text-center">
        {user.email}
      </td>
      <td className="px-4 py-2 text-sm border-x border-b border-[#E8F1ED] text-center">
        {user.currency}
      </td>
      <td className="px-4 py-2 text-sm border-x border-b border-[#E8F1ED] text-center">
        {user.type}
      </td>
      <td className="px-4 py-2 border-x border-b border-[#E8F1ED] text-center">
        <button 
          onClick={() => onEdit(user.id)}
          className="text-[#1B4D3E] hover:text-[#2D7B52] transition-colors"
          title={t('actions.edit')}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.545 3.5L10.5 5.455M1.75 12.25H3.705L11.375 4.58L9.42 2.625L1.75 10.295V12.25Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
} 