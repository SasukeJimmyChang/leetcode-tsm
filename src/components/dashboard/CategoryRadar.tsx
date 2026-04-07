'use client';

import { categories } from '@/data/problems';

interface Props {
  isCompleted: (id: string) => boolean;
}

export function CategoryRadar({ isCompleted }: Props) {
  const data = categories.map((cat) => {
    const done = cat.problems.filter((p) => isCompleted(p.id)).length;
    const total = cat.problems.length;
    return { name: cat.name, emoji: cat.emoji, done, total, pct: total > 0 ? done / total : 0 };
  });

  return (
    <div
      className="rounded-xl border p-5 animate-fade-in-up stagger-5"
      style={{
        borderColor: 'var(--color-border-light)',
        background: 'var(--color-bg-card)',
      }}
    >
      <h3
        className="text-sm font-semibold mb-4"
        style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
      >
        各主題完成度
      </h3>
      <div className="flex flex-col gap-2.5">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-3">
            <span className="text-sm w-5 text-center">{d.emoji}</span>
            <span
              className="text-xs font-medium w-28 sm:w-36 truncate"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {d.name}
            </span>
            <div
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ background: 'var(--color-surface)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.pct * 100}%`,
                  background: d.pct === 1 ? 'var(--color-easy)' : 'var(--color-primary)',
                  transition: 'width 800ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            </div>
            <span
              className="text-xs tabular-nums w-10 text-right"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              {d.done}/{d.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
