'use client';

import { useState } from 'react';
import { Category, Problem } from '@/types';
import { ProblemRow } from './ProblemRow';

const freqLabel: Record<string, { text: string; color: string; bg: string }> = {
  high: { text: '高頻', color: 'var(--color-hard)', bg: 'var(--color-hard-bg)' },
  medium: { text: '中頻', color: 'var(--color-medium)', bg: 'var(--color-medium-bg)' },
  low: { text: '低頻', color: 'var(--color-text-muted)', bg: 'var(--color-surface)' },
};

interface Props {
  category: Category;
  filteredProblems: Problem[];
  isCompleted: (id: string) => boolean;
  onToggle: (id: string) => void;
  defaultOpen?: boolean;
}

export function CategorySection({
  category,
  filteredProblems,
  isCompleted,
  onToggle,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  const completedCount = category.problems.filter((p) => isCompleted(p.id)).length;
  const totalCount = category.problems.length;
  const freq = freqLabel[category.frequency];

  if (filteredProblems.length === 0) return null;

  return (
    <div
      className="rounded-xl border overflow-hidden animate-fade-in-up"
      style={{
        borderColor: 'var(--color-border-light)',
        background: 'var(--color-bg-card)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:opacity-90 active:scale-[0.995]"
        style={{ transition: 'all 150ms ease' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{category.emoji}</span>
          <div className="text-left">
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
            >
              {category.name}
            </h3>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              {category.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className="px-2 py-0.5 rounded text-xs font-semibold"
            style={{ background: freq.bg, color: freq.color }}
          >
            {freq.text}
          </span>

          <span
            className="text-xs font-medium tabular-nums"
            style={{
              fontFamily: 'var(--font-mono)',
              color: completedCount === totalCount ? 'var(--color-easy)' : 'var(--color-text-muted)',
            }}
          >
            {completedCount}/{totalCount}
          </span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              color: 'var(--color-text-muted)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <div
        style={{
          maxHeight: open ? `${filteredProblems.length * 56 + 16}px` : '0px',
          overflow: 'hidden',
          transition: 'max-height 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="px-2 pb-2 flex flex-col gap-0.5">
          {filteredProblems.map((problem) => (
            <ProblemRow
              key={problem.id}
              problem={problem}
              completed={isCompleted(problem.id)}
              onToggle={() => onToggle(problem.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
