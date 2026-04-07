'use client';

export function Footer() {
  return (
    <footer
      className="mt-auto border-t py-6 px-4 text-center text-sm"
      style={{
        borderColor: 'var(--color-border-light)',
        color: 'var(--color-text-muted)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <p>TSMC Frontend LeetCode Tracker</p>
    </footer>
  );
}
