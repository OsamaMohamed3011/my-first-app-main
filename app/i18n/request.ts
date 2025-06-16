import { getRequestConfig } from 'next-intl/server';
import { defaultLocale } from './settings';

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locale || defaultLocale;
  return {
    locale: resolvedLocale,
    messages: (await import(`../../messages/${resolvedLocale}.json`)).default,
    timeZone: 'UTC'
  };
}); 