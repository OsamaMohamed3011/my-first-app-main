'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaGlobe } from 'react-icons/fa';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const newLocale = isEnglish ? 'ar' : 'en';
  const newPath = pathname.replace(isEnglish ? '/en' : '/ar', `/${newLocale}`);

  return (
    <Link 
      href={newPath}
      className="px-3 py-1.5 rounded bg-[#35795D] text-white transition-colors duration-200 no-underline text-sm flex items-center gap-2 h-8 hover:bg-[#2A6348] ltr:right-4 rtl:left-4"
    >
      <FaGlobe className="w-4 h-4" />
      {isEnglish ? 'العربية' : 'English'}
    </Link>
  );
} 