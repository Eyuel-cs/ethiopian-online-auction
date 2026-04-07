'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Hero() {
  const { t } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAuctions, setActiveAuctions] = useState<number>(0);

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${BASE}/auctions?limit=1`)
      .then(r => r.json())
      .then(d => { if (d.success) setActiveAuctions(d.data?.auctions?.length || 0); })
      .catch(() => {});
  }, []);

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
    <div style={{
      background: 'linear-gradient(135deg, #e0f2fe 0%, #eff6ff 50%, #f0f9ff 100%)',
      borderRadius: '24px',
      margin: '24px 16px',
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(37,99,235,0.12), 0 4px 16px rgba(0,0,0,0.06)',
      border: '1px solid rgba(37,99,235,0.1)',
    }}>
      {/* Subtle grid */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '24px', opacity: 0.4,
        backgroundImage: 'linear-gradient(rgba(37,99,235,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.08) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Glow orb top-right */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.12), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.1), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{maxWidth:'800px', margin:'0 auto', position:'relative', zIndex:1, textAlign:'center'}}>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '900',
          color: '#0f172a',
          marginBottom: '16px',
          lineHeight: '1.1',
        }}>
          {t('heroTitle')}
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#475569',
          maxWidth: '560px',
          margin: '0 auto 32px',
          lineHeight: '1.6',
        }}>
          {t('heroSubtitle')}
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} style={{display:'flex', gap:'12px', maxWidth:'560px', margin:'0 auto 28px'}}>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            style={{
              flex: 1, padding: '14px 20px', borderRadius: '14px',
              border: '1.5px solid rgba(37,99,235,0.2)', fontSize: '15px',
              outline: 'none', background: 'white', color: '#1e293b',
              boxShadow: '0 2px 12px rgba(37,99,235,0.08)',
            }}
          />
          <button type="submit" style={{
            padding: '14px 28px', borderRadius: '14px', border: 'none',
            background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
            color: 'white', fontWeight: '700', fontSize: '15px',
            cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: '0 4px 16px rgba(37,99,235,0.35)',
          }}>
            {t('searchButton')}
          </button>
        </form>

        {/* Categories */}
        <div style={{display:'flex', justifyContent:'center', gap:'12px', flexWrap:'wrap'}}>
          {categories.map(cat => (
            <button key={cat.key}
              onClick={() => router.push(`/auctions?category=${cat.key}`)}
              style={{
                padding: '10px 20px', borderRadius: '12px',
                border: '1.5px solid rgba(37,99,235,0.2)',
                background: 'white', color: '#1e40af',
                fontWeight: '600', fontSize: '14px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
                boxShadow: '0 2px 8px rgba(37,99,235,0.08)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#eff6ff';
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#2563eb';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'white';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(37,99,235,0.2)';
              }}
            >
              <span>{cat.icon}</span>
              <span>{t(cat.key)}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
