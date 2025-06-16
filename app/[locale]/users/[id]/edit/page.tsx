'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { API_ENDPOINTS, makeApiRequest } from '@/app/lib/api';
import { User } from '@/app/types';


export default function EditUserPage() {
  const t = useTranslations('users');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const userId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const endpoint = API_ENDPOINTS.users.get(parseInt(userId));
        const data = await makeApiRequest<User>(endpoint);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      age: parseInt(formData.get('age') as string),
      currency: formData.get('currency'),
      type: formData.get('type'),
    };

    try {
      const endpoint = API_ENDPOINTS.users.update(parseInt(userId));
      await makeApiRequest(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      // Navigate back to users list with locale
      router.push(`/${locale}`);
      router.refresh();
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      setError(null);

      const endpoint = API_ENDPOINTS.users.delete(parseInt(userId));
      await makeApiRequest(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Navigate back to users list and refresh
      router.push(`/${locale}`);
      router.refresh();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#1B4D3E] bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-white text-lg font-bold">
          {user ? 'Updating user...' : 'Loading user...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm mb-6 text-center">
          {error}
        <button
            onClick={() => router.push(`/${locale}`)}
            className="mt-4 text-sm underline hover:no-underline block mx-auto"
        >
            {t('form.backToList')}
        </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-[#1B4D3E] mb-6">
        {t('editUser')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.firstName')}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              defaultValue={user.firstName}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.lastName')}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              defaultValue={user.lastName}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              defaultValue={user.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.phone')}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              defaultValue={user.phone}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.age')}
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              max="100"
              required
              defaultValue={user.age}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
          />
        </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.gender')}
            </label>
            <select
              id="gender"
              name="gender"
              required
              defaultValue={user.gender}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-sm bg-gray-50 text-gray-500 cursor-not-allowed"
            >
              <option value="">{t('form.selectGender')}</option>
              <option value="male">{t('form.male')}</option>
              <option value="female">{t('form.female')}</option>
            </select>
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.currency')}
            </label>
            <select
              id="currency"
              name="currency"
              required
              defaultValue={user.currency}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
            >
              <option value="">{t('form.selectCurrency')}</option>
              <option value="SAR">SAR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-[#1B4D3E] mb-1">
              {t('form.type')}
            </label>
            <select
              id="type"
              name="type"
              required
              defaultValue={user.type}
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
            >
              <option value="">{t('form.selectType')}</option>
              <option value="ATM">ATM</option>
              <option value="POS">POS</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleteLoading}
            className="px-4 py-2 text-sm border border-red-500 text-red-500 rounded-sm hover:bg-red-50 disabled:opacity-50"
          >
            {deleteLoading ? t('form.deleting') : t('form.delete')}
          </button>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => router.push(`/${locale}`)}
              className="px-4 py-2 text-sm border border-[#2D7B52] text-[#2D7B52] rounded-sm hover:bg-gray-50"
            >
              {t('form.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-[#2D7B52] text-white rounded-sm hover:bg-[#236B42] disabled:opacity-50"
            >
              {loading ? t('form.saving') : t('form.save')}
            </button>
          </div>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-sm max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-[#1B4D3E] mb-4">
              {t('form.deleteConfirmation')}
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50"
              >
                {t('form.cancel')}
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-sm hover:bg-red-600 disabled:opacity-50"
              >
                {deleteLoading ? t('form.deleting') : t('form.delete')}
              </button>
            </div>
          </div>
      </div>
      )}
    </div>
  );
} 