'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { API_ENDPOINTS, makeApiRequest } from '@/app/lib/api';

export default function CreateUserPage() {
  const t = useTranslations('users');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      age: parseInt(formData.get('age') as string),
      gender: formData.get('gender'),
      currency: formData.get('currency'),
      type: formData.get('type')
    };

    try {
      const endpoint = API_ENDPOINTS.users.create();
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
      console.error('Error creating user:', error);
      setError('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#1B4D3E] bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-white text-lg font-bold">Creating user...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-[#1B4D3E] mb-6">
        {t('createUser')}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm mb-6 text-center">
          {error}
        </div>
      )}

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
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#2D7B52] text-gray-900"
            >
              <option value="">{t('form.selectType')}</option>
              <option value="ATM">ATM</option>
              <option value="POS">POS</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
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
      </form>
    </div>
  );
} 