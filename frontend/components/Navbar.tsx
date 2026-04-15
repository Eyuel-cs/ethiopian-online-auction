'use client';

import { useState } from 'react';
import { useLanguage, languages, Language } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NotificationBell from './NotificationBell';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  const handleAuctionsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      router.push('/auth/register');
    }
    close();
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="text-xl font-bold text-blue-600 shrink-0">
            🔨 AuctionET
          </Link>

          {/* ── Desktop nav (lg+) ── */}
          <div className="hidden lg:flex items-center gap-5 flex-1 mx-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium text-sm">{t('home')}</Link>
            <Link href="/auctions" onClick={handleAuctionsClick} className="text-gray-700 hover:text-blue-600 font-medium text-sm">Auctions</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium text-sm">{t('aboutUs')}</Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-600 font-medium text-sm">{t('faq')}</Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium text-sm">{t('pricing')}</Link>
          </div>

          {/* ── Desktop right actions (lg+) ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>

            {isAuthenticated ? (
              <>
                {(user?.subscription.plan === 'seller' || user?.subscription.plan === 'premium') && (
                  <Link href="/create-auction" className="px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium text-sm whitespace-nowrap">
                    + Create Auction
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link href="/admin" className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium text-sm whitespace-nowrap">
                    🔐 Admin
                  </Link>
                )}
                <NotificationBell />
                <Link href="/dashboard" className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm whitespace-nowrap">{t('dashboard')}</Link>
                <Link href="/settings" className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg" title="Settings">⚙️</Link>
                <button
                  onClick={() => { logout(); router.push('/'); }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm whitespace-nowrap"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-sm">{t('signIn')}</Link>
                <Link href="/auth/register" className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-sm">{t('register')}</Link>
              </>
            )}
          </div>

          {/* ── Mobile/tablet right: bell + hamburger (below lg) ── */}
          <div className="flex lg:hidden items-center gap-2">
            {isAuthenticated && <NotificationBell />}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile/tablet dropdown menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-white px-4 py-4">
          {/* Nav links */}
          <div className="flex flex-col gap-1 mb-4">
            <Link href="/" onClick={close} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">{t('home')}</Link>
            <Link href="/auctions" onClick={handleAuctionsClick} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Auctions</Link>
            <Link href="/about" onClick={close} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">{t('aboutUs')}</Link>
            <Link href="/faq" onClick={close} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">{t('faq')}</Link>
            <Link href="/pricing" onClick={close} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">{t('pricing')}</Link>
          </div>

          {/* Divider + actions */}
          <div className="border-t pt-4 flex flex-col gap-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(languages).map(([code, name]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>

            {isAuthenticated ? (
              <>
                {(user?.subscription.plan === 'seller' || user?.subscription.plan === 'premium') && (
                  <Link href="/create-auction" onClick={close} className="w-full text-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm">
                    + Create Auction
                  </Link>
                )}
                {user?.role === 'admin' && (
                  <Link href="/admin" onClick={close} className="w-full text-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium text-sm">
                    🔐 Admin
                  </Link>
                )}
                <Link href="/dashboard" onClick={close} className="w-full text-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium text-sm">
                  {t('dashboard')}
                </Link>
                <Link href="/settings" onClick={close} className="w-full text-center px-4 py-2 text-gray-700 bg-gray-50 rounded-lg font-medium text-sm">
                  ⚙️ Settings
                </Link>
                <button
                  onClick={() => { logout(); router.push('/'); close(); }}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-sm"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={close} className="w-full text-center px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium text-sm">
                  {t('signIn')}
                </Link>
                <Link href="/auth/register" onClick={close} className="w-full text-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium text-sm">
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
