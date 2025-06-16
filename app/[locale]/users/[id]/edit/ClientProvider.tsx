'use client';

import { NextIntlClientProvider } from 'next-intl';

interface ClientProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export default function ClientProvider({ children, locale, messages }: ClientProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 