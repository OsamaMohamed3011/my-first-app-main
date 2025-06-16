import { User, UserFormData } from "../types";

/**
 * Transforms raw user data from the API into our application's User type
 */
export function transformUserData(userData: any): User {
  return {
    id: userData.id,
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone || '',
    age: userData.age || 0,
    address: userData.address || {},
    company: userData.company || {},
    email: userData.email || `${userData.bank?.iban}@example.com`,
    accountNumber: userData.bank?.iban || '',
    currency: userData.bank?.currency || 'SAR',
    type: userData.id % 2 === 0 ? 'ATM' : 'POS',
    bank: {
      iban: userData.bank?.iban || '',
      currency: userData.bank?.currency || 'SAR',
      cardNumber: userData.bank?.cardNumber || '',
      cardExpire: userData.bank?.cardExpire || '12/25',
      cardType: userData.bank?.cardType || 'VISA',
    },
    gender: userData.gender,
    image: userData.image || '',
    ein: userData.ein || '',
    ssn: userData.ssn || '',
    userAgent: userData.userAgent || '',
  };
}

/**
 * Transforms a list of users from the API
 */
export function transformUsersList(usersData: any[]): User[] {
  return usersData.map(userData => transformUserData(userData));
}

/**
 * Prepares user data for API submission
 */
export function prepareUserDataForApi(formData: UserFormData, existingUser: User) {
  // Split the name into first and last name
  const nameParts = formData.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    id: existingUser.id,
    firstName,
    lastName,
    username: formData.accountNumber,
    email: `${formData.accountNumber}@example.com`,
    accountNumber: formData.accountNumber,
    currency: formData.currency,
    gender: existingUser.gender || 'other',
    type: formData.type,
    bank: {
      cardExpire: existingUser.bank?.cardExpire || '12/25',
      cardNumber: formData.accountNumber,
      cardType: 'VISA',
      currency: formData.currency,
      iban: formData.accountNumber
    }
  };
} 