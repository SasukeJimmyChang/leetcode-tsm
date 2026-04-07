'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder="搜尋題目名稱或題號..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2 rounded-lg text-sm border outline-none"
        style={{
          background: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-light)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
        }}
      />
    </div>
  );
}
