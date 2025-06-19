'use client';

import { useTranslations } from 'next-intl';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { User } from '@/app/types';
import { userTableColumns } from '@/app/constants/tableConfig';
import { useState } from 'react';

interface UserTableRowProps {
  user: User;
  index: number;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function UserTableRow({ user, index, onEdit, onDelete }: UserTableRowProps) {
  const t = useTranslations('table');
  const [showConfirm, setShowConfirm] = useState(false);

  const renderCell = (column: typeof userTableColumns[0]) => {
    if (column.key === 'actions') {
      return (
        <div className="flex items-center justify-center gap-2">
          <button 
            onClick={() => onEdit(user.id)}
            className="text-info-dark hover:text-success-main transition-colors"
            title={t('actions.edit')}
          >
            <FaEdit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-error-main hover:text-red-800 transition-colors"
            title={t('actions.delete')}
          >
            <FaTrash className="w-3.5 h-3.5" />
          </button>
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
              <div className="bg-white p-6 rounded shadow max-w-xs w-full">
                <div className="mb-4 text-info-dark font-semibold text-center">{t('deleteConfirmation', { ns: 'form' })}</div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="px-3 py-1 text-sm border border-secondary-main rounded hover:bg-secondary-light"
                  >
                    {t('cancel', { ns: 'form' })}
                  </button>
                  <button
                    onClick={() => { setShowConfirm(false); onDelete(user.id); }}
                    className="px-3 py-1 text-sm bg-error-main text-white rounded hover:bg-red-700"
                  >
                    {t('delete', { ns: 'form' })}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (column.render) {
      return column.render(user);
    }

    const value = user[column.key as keyof User];
    return typeof value === 'object' ? JSON.stringify(value) : value;
  };

  return (
    <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-secondary-light'} hover:bg-info-main transition-colors`}>
      {userTableColumns.map((column) => (
        <td key={column.key} className="px-4 py-2 text-sm border-x border-b border-info-main text-center">
          {renderCell(column)}
        </td>
      ))}
    </tr>
  );
} 