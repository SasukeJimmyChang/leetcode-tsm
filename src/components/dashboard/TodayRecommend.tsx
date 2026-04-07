'use client';

import { useMemo } from 'react';
import { mustDoProblems } from '@/data/problems';
import { DifficultyBadge } from '@/components/problems/DifficultyBadge';

interface Props {
  isCompleted: (id: string) => boolean;
}

export function TodayRecommend({ isCompleted }: Props) {
  const recommendations = useMemo(() => {
    const incomplete = mustDoProblems.filter((p) => !isCompleted(p.id));
    // Deterministic daily shuffle based on date
    const seed = new Date().toISOString().split('T')[0];
    const hash = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const shuffled = [...incomplete].sort(
      (a, b) => ((a.leetcodeNumber * hash) % 97) - ((b.leetcodeNumber * hash) % 97)
    );
    return shuffled.slice(0, 3);
  }, [isCompleted]);

  if (recommendations.length === 0) {
    return (
      <div
        className="rounded-xl border p-5 text-center animate-fade-in-up stagger-6"
        style={{
          borderColor: 'var(--color-border-light)',
          background: 'var(--color-bg-card)',
        }}
      >
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          所有必刷題都完成了！
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-5 animate-fade-in-up stagger-6"
      style={{
        borderColor: 'var(--color-border-light)',
        background: 'var(--color-bg-card)',
      }}
    >
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
      >
        今日推薦
      </h3>
      <div className="flex flex-col gap-2">
        {recommendations.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:shadow-sm"
            style={{
              background: 'var(--color-bg-secondary)',
              transition: 'box-shadow 200ms ease, transform 150ms ease',
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            <span
              className="text-xs font-medium w-10 text-right"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              #{p.leetcodeNumber}
            </span>
            <span
              className="text-sm font-medium flex-1 truncate"
              style={{ color: 'var(--color-text)' }}
            >
              {p.title}
            </span>
            <DifficultyBadge difficulty={p.difficulty} />
          </a>
        ))}
      </div>
    </div>
  );
}
