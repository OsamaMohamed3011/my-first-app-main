'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { API_ENDPOINTS, makeApiRequest } from '@/app/lib/api';
import { prepareUserDataForApi } from '@/app/utils/userHelpers';
import type { UserFormProps, UserFormData, User } from '@/app/types';

export default function UserForm({ user, onSuccess, onCancel, onDelete }: UserFormProps) {
  const t = useTranslations('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm(t('deleteConfirmation'))) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await makeApiRequest(API_ENDPOINTS.users.delete(user.id), {
        method: 'DELETE',
      });

      onDelete();
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
      setIsDeleting(false);
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
    if (!loading && !isDeleting) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-[#1B4D3E] mb-8">{t('editUser')}</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm mb-6">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Account Number - Disabled */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('fields.accountNumber')}
          </label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('fields.name')}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#2D7B52] rounded-sm focus:outline-none focus:border-[#1B4D3E]"
          />
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('fields.currency')}
          </label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-[#2D7B52] rounded-sm focus:outline-none focus:border-[#1B4D3E]"
          >
            <option value="SAR">SAR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Type - Disabled */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('fields.type')}
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded-sm hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
          disabled={loading || isDeleting}
        >
          {isDeleting ? '...' : t('delete')}
        </button>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm border border-[#2D7B52] text-[#2D7B52] rounded-sm hover:bg-[#F5F9F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || isDeleting}
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-[#2D7B52] text-white rounded-sm hover:bg-[#236B42] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading || isDeleting}
          >
            {loading ? '...' : t('save')}
          </button>
        </div>
      </div>
    </form>
  );
} 