import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { ReactNode } from 'react'
import clsx from 'clsx'
import '../globals.css'

const locales = ['en', 'ar']

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) {
    notFound()
  }

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div 
        className={clsx(
          'min-h-screen w-full',
          {
            'bg-background-light': locale === 'en',
            'bg-background-dark': locale === 'ar'
          }
        )}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
      >
        {children}
      </div>
    </NextIntlClientProvider>
  )
} 