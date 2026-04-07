'use client';

import { useEffect, useState } from 'react';
import { allProblems, mustDoProblems } from '@/data/problems';

interface Props {
  completedCount: number;
  isCompleted: (id: string) => boolean;
  currentStreak: number;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 600;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

export function StatsCards({ completedCount, isCompleted, currentStreak }: Props) {
  const mustDoCompleted = mustDoProblems.filter((p) => isCompleted(p.id)).length;
  const mustDoTotal = mustDoProblems.length;

  const easyDone = allProblems.filter((p) => p.difficulty === 'Easy' && isCompleted(p.id)).length;
  const medDone = allProblems.filter((p) => p.difficulty === 'Medium' && isCompleted(p.id)).length;
  const hardDone = allProblems.filter((p) => p.difficulty === 'Hard' && isCompleted(p.id)).length;

  const cards = [
    {
      title: '已完成',
      value: completedCount,
      subtitle: `共 ${allProblems.length} 題`,
      accent: 'var(--color-primary)',
      bg: 'var(--color-primary-bg)',
    },
    {
      title: '必刷完成率',
      value: mustDoCompleted,
      subtitle: `/ ${mustDoTotal} 題`,
      accent: 'var(--color-must-do)',
      bg: 'var(--color-must-do-bg)',
    },
    {
      title: '連續天數',
      value: currentStreak,
      subtitle: '天',
      accent: 'var(--color-accent-text)',
      bg: 'var(--color-accent-bg)',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className={`rounded-xl p-5 border animate-fade-in-up stagger-${i + 1}`}
          style={{
            borderColor: 'var(--color-border-light)',
            background: card.bg,
          }}
        >
          <p className="text-xs font-medium mb-1" style={{ color: card.accent }}>
            {card.title}
          </p>
          <p
            className="text-2xl font-bold tabular-nums"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            <AnimatedNumber value={card.value} />
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {card.subtitle}
          </p>
        </div>
      ))}

      <div
        className="sm:col-span-3 rounded-xl p-5 border animate-fade-in-up stagger-4"
        style={{
          borderColor: 'var(--color-border-light)',
          background: 'var(--color-bg-card)',
        }}
      >
        <p className="text-xs font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          難度分布
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'Easy', done: easyDone, total: allProblems.filter((p) => p.difficulty === 'Easy').length, color: 'var(--color-easy)' },
            { label: 'Medium', done: medDone, total: allProblems.filter((p) => p.difficulty === 'Medium').length, color: 'var(--color-medium)' },
            { label: 'Hard', done: hardDone, total: allProblems.filter((p) => p.difficulty === 'Hard').length, color: 'var(--color-hard)' },
          ].map((d) => (
            <div key={d.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                {d.label}
              </span>
              <span
                className="text-sm tabular-nums"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {d.done}/{d.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
