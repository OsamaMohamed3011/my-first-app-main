'use client';

import { useTranslations } from 'next-intl';
import { FaEdit } from 'react-icons/fa';
import type { User } from '@/app/types';
import { userTableColumns } from '@/app/constants/tableConfig';

interface UserTableRowProps {
  user: User;
  index: number;
  onEdit: (id: number) => void;
}

export default function UserTableRow({ user, index, onEdit }: UserTableRowProps) {
  const t = useTranslations('table');

  const renderCell = (column: typeof userTableColumns[0]) => {
    if (column.key === 'actions') {
      return (
        <button 
          onClick={() => onEdit(user.id)}
          className="text-[#1B4D3E] hover:text-[#2D7B52] transition-colors"
          title={t('actions.edit')}
        >
          <FaEdit className="w-3.5 h-3.5" />
        </button>
      );
    }

    if (column.render) {
      return column.render(user);
    }

    const value = user[column.key as keyof User];
    return typeof value === 'object' ? JSON.stringify(value) : value;
  };

  return (
    <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F5F9F7]'} hover:bg-[#E8F1ED] transition-colors`}>
      {userTableColumns.map((column) => (
        <td key={column.key} className="px-4 py-2 text-sm border-x border-b border-[#E8F1ED] text-center">
          {renderCell(column)}
        </td>
      ))}
    </tr>
  );
} 