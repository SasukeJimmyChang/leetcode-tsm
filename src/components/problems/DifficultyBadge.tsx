'use client';

interface Props {
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const styles: Record<string, { bg: string; color: string }> = {
  Easy: { bg: 'var(--color-easy-bg)', color: 'var(--color-easy)' },
  Medium: { bg: 'var(--color-medium-bg)', color: 'var(--color-medium)' },
  Hard: { bg: 'var(--color-hard-bg)', color: 'var(--color-hard)' },
};

export function DifficultyBadge({ difficulty }: Props) {
  const s = styles[difficulty];
  return (
    <span
      className="inline-flex px-2 py-0.5 rounded-md text-xs font-semibold"
      style={{ background: s.bg, color: s.color, fontFamily: 'var(--font-body)' }}
    >
      {difficulty}
    </span>
  );
}
