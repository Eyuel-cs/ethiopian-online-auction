'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Hero() {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { key: 'electronics', icon: '💻' },
    { key: 'vehicles',    icon: '🚗' },
    { key: 'jewelry',     icon: '💎' },
    { key: 'homeGarden',  icon: '🏡' },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    router.push(searchQuery.trim() ? `/auctions?search=${encodeURIComponent(searchQuery.trim())}` : '/auctions');
  };

  return (
    // overflow-hidden on the wrapper clips the glow orbs so they never cause horizontal scroll
    <div className="w-full overflow-hidden">
      <div className="relative mx-2 sm:mx-4 my-3 sm:my-6 rounded-2xl sm:rounded-3xl overflow-hidden
                      bg-gradient-to-br from-sky-100 via-blue-50 to-sky-50
                      border border-blue-100 shadow-xl">

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(37,99,235,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.08) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow orbs — kept inside overflow-hidden parent so they don't bleed out */}
        <div className="absolute -top-16 -right-16 w-48 h-48 sm:w-72 sm:h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)' }} />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 sm:w-56 sm:h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.1), transparent 70%)' }} />

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-24 text-center">

          {/* Title — scales down aggressively on small screens */}
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-slate-900 leading-tight mb-3 sm:mb-4 break-words">
            {t('heroTitle')}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-xl mx-auto mb-5 sm:mb-8 leading-relaxed px-2">
            {t('heroSubtitle')}
          </p>

          {/* Search — stacks vertically on mobile */}
          <form onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full max-w-xl mx-auto mb-5 sm:mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-blue-200 text-sm
                         bg-white text-slate-800 outline-none focus:ring-2 focus:ring-blue-400
                         shadow-sm placeholder:text-slate-400"
            />
            <button type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white
                         bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600
                         shadow-lg transition-all whitespace-nowrap">
              {t('searchButton')}
            </button>
          </form>

          {/* Categories — 2 per row on mobile, wrap naturally */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-3">
            {categories.map(cat => (
              <button key={cat.key}
                onClick={() => router.push(`/auctions?category=${cat.key}`)}
                className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl
                           border border-blue-200 bg-white text-blue-800 font-semibold text-xs sm:text-sm
                           hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm">
                <span>{cat.icon}</span>
                <span>{t(cat.key)}</span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
