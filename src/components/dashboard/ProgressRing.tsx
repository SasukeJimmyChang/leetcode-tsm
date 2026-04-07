'use client';

import { useEffect, useState } from 'react';

interface Props {
  completed: number;
  total: number;
  label: string;
  size?: number;
}

export function ProgressRing({ completed, total, label, size = 160 }: Props) {
  const [animatedCount, setAnimatedCount] = useState(0);
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? completed / total : 0;
  const offset = circumference * (1 - percentage);

  useEffect(() => {
    let frame: number;
    const duration = 800;
    const start = performance.now();
    const from = 0;
    const to = completed;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedCount(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [completed]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 800ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {animatedCount}
          </span>
          <span
            className="text-xs font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            / {total}
          </span>
        </div>
      </div>
      <span
        className="text-sm font-medium"
        style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}
      >
        {label}
      </span>
    </div>
  );
}
