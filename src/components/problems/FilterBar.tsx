'use client';

import { cn } from '@/lib/utils';

export type FilterType = 'all' | 'must-do' | 'incomplete';

interface Props {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'must-do', label: '必刷' },
  { value: 'incomplete', label: '未完成' },
];

export function FilterBar({ activeFilter, onFilterChange }: Props) {
  return (
    <div className="flex items-center gap-1.5">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-sm font-medium',
            'hover:opacity-80 active:scale-95'
          )}
          style={{
            background: activeFilter === f.value ? 'var(--color-primary)' : 'var(--color-surface)',
            color: activeFilter === f.value ? 'var(--color-primary-fg)' : 'var(--color-text-secondary)',
            transition: 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
