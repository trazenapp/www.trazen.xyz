"use client";

import { useEffect } from 'react';

export default function UserJotLoader() {
  useEffect(() => {
    // 1. The SDK Loader Script
    (window as any).$ujq = (window as any).$ujq || [];
    (window as any).uj = (window as any).uj || new Proxy({}, {
      get: (_, p) => (...a: any) => (window as any).$ujq.push([p, ...a])
    });

    // Avoid re-adding the script on re-renders
    if (!document.querySelector('script[src="https://cdn.userjot.com/sdk/v2/uj.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.userjot.com/sdk/v2/uj.js';
      script.type = 'module';
      script.async = true;
      document.head.appendChild(script);
    }

    // 2. The Config Code
    (window as any).uj.init(process.env.NEXT_PUBLIC_USERJOT_ID, {
      widget: true,
      position: 'right',
      theme: 'dark'
    });

  }, []); // The empty array [] means this effect runs only once on mount

  return null; // This component doesn't render any visible HTML
}