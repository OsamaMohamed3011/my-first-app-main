'use client';

import { NextIntlClientProvider } from 'next-intl';

interface ClientProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export default function ClientProvider({ children, locale, messages }: ClientProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
} 