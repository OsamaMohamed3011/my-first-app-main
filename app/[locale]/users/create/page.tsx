'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';
import { API_ENDPOINTS, makeApiRequest } from '@/app/lib/api';
import FormField from '@/app/[locale]/components/FormField';

export default function CreateUserPage() {
  const t = useTranslations('users');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    currency: '',
    type: ''
  });

  // Form fields configuration
  const formFields = [
    {
      label: t('form.firstName'),
      name: 'firstName',
      type: 'text' as const,
      value: formData.firstName,
      required: true
    },
    {
      label: t('form.lastName'),
      name: 'lastName',
      type: 'text' as const,
      value: formData.lastName,
      required: true
    },
    {
      label: t('form.email'),
      name: 'email',
      type: 'email' as const,
      value: formData.email,
      required: true
    },
    {
      label: t('form.phone'),
      name: 'phone',
      type: 'tel' as const,
      value: formData.phone,
      required: true
    },
    {
      label: t('form.age'),
      name: 'age',
      type: 'number' as const,
      value: formData.age,
      required: true,
      min: 18,
      max: 100
    },
    {
      label: t('form.gender'),
      name: 'gender',
      type: 'select' as const,
      value: formData.gender,
      required: true,
      options: [
        { value: 'male', label: t('form.male') },
        { value: 'female', label: t('form.female') }
      ]
    },
    {
      label: t('form.currency'),
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
      label: t('form.type'),
      name: 'type',
      type: 'select' as const,
      value: formData.type,
      required: true,
      options: [
        { value: 'ATM', label: 'ATM' },
        { value: 'POS', label: 'POS' }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      age: parseInt(formData.age),
      gender: formData.gender,
      currency: formData.currency,
      type: formData.type
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

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-info-dark bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-white text-lg font-bold">Creating user...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold text-info-dark mb-6">
        {t('createUser')}
      </h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-error-main p-4 rounded-sm mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {formFields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={field.value}
              onChange={handleChange}
              required={field.required}
              options={field.options}
              min={field.min}
              max={field.max}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push(`/${locale}`)}
              className="px-4 py-2 text-sm border border-success-main text-success-main rounded-sm hover:bg-info-main"
            >
              {t('form.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-success-main text-white rounded-sm hover:bg-success-dark disabled:opacity-50"
            >
              {loading ? t('form.creating') : t('form.create')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 