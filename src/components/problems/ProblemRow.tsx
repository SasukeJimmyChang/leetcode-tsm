'use client';

import { Problem } from '@/types';
import { DifficultyBadge } from './DifficultyBadge';
import { cn } from '@/lib/utils';

interface Props {
  problem: Problem;
  completed: boolean;
  onToggle: () => void;
}

export function ProblemRow({ problem, completed, onToggle }: Props) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-2.5 rounded-lg group',
        'hover:shadow-sm'
      )}
      style={{
        background: completed ? 'var(--color-primary-bg)' : 'transparent',
        transition: 'background 200ms ease, box-shadow 200ms ease',
      }}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className={cn('custom-checkbox', completed && 'animate-check-pop')}
      />

      <span
        className="text-sm font-medium w-12 text-right shrink-0"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
      >
        {problem.leetcodeNumber}
      </span>

      <a
        href={problem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium flex-1 min-w-0 truncate hover:underline"
        style={{
          color: completed ? 'var(--color-text-muted)' : 'var(--color-text)',
          textDecoration: completed ? 'line-through' : 'none',
          textDecorationColor: 'var(--color-border)',
        }}
      >
        {problem.title}
      </a>

      <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
        <DifficultyBadge difficulty={problem.difficulty} />

        {problem.isMustDo && (
          <span
            className="inline-flex px-1.5 py-0.5 rounded text-xs font-semibold"
            style={{ background: 'var(--color-must-do-bg)', color: 'var(--color-must-do)' }}
          >
            必刷
          </span>
        )}

        {problem.tags.includes('台積實戰') && (
          <span
            className="inline-flex px-1.5 py-0.5 rounded text-xs font-semibold"
            style={{ background: 'var(--color-tsmc-real-bg)', color: 'var(--color-tsmc-real)' }}
          >
            台積實戰
          </span>
        )}

        {problem.tags.includes('台積考古') && (
          <span
            className="inline-flex px-1.5 py-0.5 rounded text-xs font-semibold"
            style={{ background: 'var(--color-tsmc-bg)', color: 'var(--color-accent-text)' }}
          >
            台積考古
          </span>
        )}
      </div>
    </div>
  );
}
