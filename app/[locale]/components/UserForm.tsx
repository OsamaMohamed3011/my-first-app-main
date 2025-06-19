'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { API_ENDPOINTS, makeApiRequest } from '@/app/lib/api';
import { prepareUserDataForApi } from '@/app/utils/userHelpers';
import type { UserFormProps, UserFormData, User } from '@/app/types';
import { userTableColumns } from '@/app/constants/tableConfig';
import FormField from './FormField';

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

  // Form fields configuration
  const formFields = [
    {
      label: t('fields.accountNumber'),
      name: 'accountNumber',
      type: 'text' as const,
      value: formData.accountNumber,
      disabled: true
    },
    {
      label: t('fields.name'),
      name: 'name',
      type: 'text' as const,
      value: formData.name,
      required: true
    },
    {
      label: t('fields.currency'),
      name: 'currency',
      type: 'select' as const,
      value: formData.currency,
      required: true,
      options: [
        { value: 'SAR', label: 'SAR' },
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' }
      ]
    },
    {
      label: t('fields.type'),
      name: 'type',
      type: 'text' as const,
      value: formData.type,
      disabled: true
    }
  ];

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
          {formFields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={field.value}
              onChange={handleChange}
              required={field.required}
              disabled={field.disabled}
              options={field.options}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 text-sm border border-success-main text-success-main rounded-sm hover:bg-info-main disabled:opacity-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-success-main text-white rounded-sm hover:bg-success-dark disabled:opacity-50"
            >
              {loading ? t('saving') : t('save')}
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