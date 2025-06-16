import { getTranslations } from 'next-intl/server';
import UsersTable from './components/UsersTable';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-secondary-dark mb-6">
        {t('title')}
      </h1>
      <UsersTable />
    </div>
  );
} 