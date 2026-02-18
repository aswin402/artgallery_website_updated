'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function DustBackground() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;

    const isDark = resolvedTheme === 'dark';

    const cleanup = () => {
      document.getElementById('dust-bg-container')?.remove();
      document
        .querySelectorAll('style[data-dust-stars]')
        .forEach(s => s.remove());
    };

    cleanup();

    const container = document.createElement('div');
    container.id = 'dust-bg-container';
    container.className =
      'fixed inset-0 pointer-events-none -z-10 overflow-hidden';

    const starLayer = document.createElement('div');
    starLayer.className = 'absolute inset-0';

    const STAR_COUNT = isDark ? 32 : 44;

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement('div');

      const size = isDark
        ? Math.random() * 5 + 2
        : Math.random() * 5 + 3;

      const duration = Math.random() * 30 + 25;

      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${
          isDark
            ? 'rgba(255,255,255,0.95)'
            : 'rgba(0,169,157,0.95)'
        };
        box-shadow:
          0 0 ${size * 2.5}px ${
            isDark
              ? 'rgba(255,255,255,0.5)'
              : 'rgba(0,169,157,0.6)'
          };
        opacity: ${Math.random() * 0.4 + 0.6};
        animation: starFloat ${duration}s linear infinite;
        animation-delay: ${Math.random() * 20}s;
      `;

      starLayer.appendChild(star);
    }

    container.appendChild(starLayer);

    const style = document.createElement('style');
    style.setAttribute('data-dust-stars', 'true');
    style.textContent = `
      @keyframes starFloat {
        0% { transform: translateY(0); opacity: 0; }
        15% { opacity: 1; }
        85% { opacity: 1; }
        100% { transform: translateY(-140vh); opacity: 0; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(container);

    return cleanup;
  }, [resolvedTheme]);

  return null;
}
