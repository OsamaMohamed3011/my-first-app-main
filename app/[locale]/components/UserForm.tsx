'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { API_ENDPOINTS, makeApiRequest } from '@/app/lib/api';
import { prepareUserDataForApi } from '@/app/utils/userHelpers';
import type { UserFormProps, UserFormData, User } from '@/app/types';
import { userTableColumns } from '@/app/constants/tableConfig';

export default function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
  const t = useTranslations('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<UserFormData>({
    accountNumber: user.accountNumber,
    name: `${user.firstName} ${user.lastName}`,
    currency: user.currency, 
    type: user.type
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const preparedData = prepareUserDataForApi(formData, user);
      await makeApiRequest(API_ENDPOINTS.users.update(user.id), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedData),
      });

      onSuccess();
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: UserFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle cancel click
  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!loading) {
      onCancel();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 rtl:text-right">
        <h2 className="text-2xl font-semibold text-info-dark mb-8">{t('editUser')}</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-error-main p-4 rounded-sm mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Account Number - Disabled */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1 rtl:text-right">
              {t('fields.accountNumber')}
            </label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              disabled
              className="w-full px-3 py-2 border border-secondary-main rounded-sm bg-secondary-light text-text-dark cursor-not-allowed"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1 rtl:text-right">
              {t('fields.name')}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-success-main rounded-sm focus:outline-none focus:border-info-dark"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1 rtl:text-right">
              {t('fields.currency')}
            </label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-success-main rounded-sm focus:outline-none focus:border-info-dark"
            >
              <option value="SAR">SAR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Type - Disabled */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1 rtl:text-right">
              {t('fields.type')}
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              disabled
              className="w-full px-3 py-2 border border-secondary-main rounded-sm bg-secondary-light text-text-dark cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-between mt-8 rtl:flex-row-reverse">
          {/* Action Buttons */}
          <div className="flex gap-3 ml-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm border border-success-main text-success-main rounded-sm hover:bg-info-main transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-success-main text-white rounded-sm hover:bg-success-dark transition-colors disabled:bg-secondary-main disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? '...' : t('save')}
            </button>
          </div>
        </div>
      </form>

      {/* User Table Mapping */}
      <div className="max-w-2xl mx-auto mt-10">
        <h3 className="text-lg font-semibold mb-4">User Data Mapping</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-info-light">
              {userTableColumns.map((col) => (
                <th key={col.key} className="px-4 py-2 text-info-dark border border-success-main text-center text-sm font-normal">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              {userTableColumns.map((col) => (
                <td key={col.key} className="px-4 py-2 border border-info-main text-center text-sm">
                  {col.key === 'actions'
                    ? null
                    : col.render
                      ? col.render(user)
                      : (() => {
                          const value = user[col.key as keyof User];
                          if (typeof value === 'object' && value !== null) {
                            return JSON.stringify(value);
                          }
                          return value as React.ReactNode;
                        })()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
} 