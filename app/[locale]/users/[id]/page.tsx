import { getTranslations } from 'next-intl/server';
import { API_ENDPOINTS, makeApiRequest } from '@/app/lib/api';
import { User } from '@/app/types';
import { userTableColumns } from '@/app/constants/tableConfig';
import { notFound } from 'next/navigation';

async function getUser(id: string): Promise<User> {
  try {
    const data = await makeApiRequest<User>(API_ENDPOINTS.users.get(parseInt(id)));
    if (!data || !data.id) {
      throw new Error('Invalid user data');
    }
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    notFound();
  }
}

export default async function UserDetailsPage({
  params
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  try {
    const { id } = await params;
    const t = await getTranslations('userDetails');
    const user = await getUser(id);

    return (
      <div className="container mx-auto p-4">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-info-dark mb-6">
            {t('title')}
          </h1>

          {/* User Table Mapping */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 text-info-dark">User Data Mapping</h2>
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

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-info-dark">
                  {`${user.firstName} ${user.lastName}`}
                </h2>
                <p className="text-secondary-main">{user.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-info-dark">
                  Location
                </h3>
                <p className="text-secondary-main">
                  Lat: {user.address?.coordinates?.lat || 'N/A'}
                </p>
                <p className="text-secondary-main">
                  Lng: {user.address?.coordinates?.lng || 'N/A'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-info-dark">
                  Bank Details
                </h3>
                <p className="text-secondary-main">
                  Card Number: {user.bank?.cardNumber || 'N/A'}
                </p>
                <p className="text-secondary-main">
                  Expires: {user.bank?.cardExpire || 'N/A'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-medium text-info-dark">
                {t('company.title')}
              </h2>
              
              <div>
                <h3 className="text-sm font-medium text-info-dark">
                  {t('company.name')}
                </h3>
                <p className="text-secondary-main">{user.company?.name || 'N/A'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-info-dark">
                  {t('company.department')}
                </h3>
                <p className="text-secondary-main">{user.company?.department || 'N/A'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-info-dark">
                  {t('company.title')}
                </h3>
                <p className="text-secondary-main">{user.company?.title || 'N/A'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-info-dark">
                  {t('company.address')}
                </h3>
                <p className="text-secondary-main">
                  {user.company?.address?.address || 'N/A'}
                </p>
                <p className="text-secondary-main">
                  {user.company?.address ? 
                    `${user.company.address.city || ''}, ${user.company.address.state || ''} ${user.company.address.postalCode || ''}`.trim() || 'N/A' 
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in UserDetailsPage:', error);
    notFound();
  }
} 