'use client';

import { ReviewItem } from '@/types';
import { allProblems } from '@/data/problems';
import { DifficultyBadge } from '@/components/problems/DifficultyBadge';
import { formatDate } from '@/lib/utils';

interface Props {
  reviewItems: ReviewItem[];
  onMarkReviewed: (problemId: string) => void;
}

const urgencyStyles = {
  high: { border: 'var(--color-hard)', bg: 'var(--color-hard-bg)', label: '急需複習' },
  medium: { border: 'var(--color-medium)', bg: 'var(--color-medium-bg)', label: '建議複習' },
  low: { border: 'var(--color-easy)', bg: 'var(--color-easy-bg)', label: '可以複習' },
};

export function ReviewSection({ reviewItems, onMarkReviewed }: Props) {
  if (reviewItems.length === 0) {
    return (
      <div
        className="rounded-xl border p-5 animate-fade-in-up"
        style={{
          borderColor: 'var(--color-border-light)',
          background: 'var(--color-bg-card)',
        }}
      >
        <h3
          className="text-sm font-semibold mb-3"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          間隔複習
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          目前沒有需要複習的題目。完成題目後，系統會在 1、3、7、14、30 天後提醒你複習。
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl border p-5 animate-fade-in-up"
      style={{
        borderColor: 'var(--color-border-light)',
        background: 'var(--color-bg-card)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-sm font-semibold"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          間隔複習
        </h3>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: 'var(--color-hard-bg)', color: 'var(--color-hard)' }}
        >
          {reviewItems.length} 題待複習
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {reviewItems.slice(0, 8).map((item) => {
          const problem = allProblems.find((p) => p.id === item.problemId);
          if (!problem) return null;

          const style = urgencyStyles[item.urgency];

          return (
            <div
              key={item.problemId}
              className="flex items-start gap-3 px-3 py-3 rounded-lg"
              style={{
                background: style.bg,
                borderLeft: `3px solid ${style.border}`,
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-xs font-medium"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                  >
                    #{problem.leetcodeNumber}
                  </span>
                  <a
                    href={problem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium truncate hover:underline"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {problem.title}
                  </a>
                  <DifficultyBadge difficulty={problem.difficulty} />
                </div>
                <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span>首次完成：{formatDate(item.completedAt)}</span>
                  <span
                    className="font-medium"
                    style={{ color: style.border }}
                  >
                    {item.reason}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onMarkReviewed(item.problemId)}
                className="shrink-0 px-2.5 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 active:scale-95"
                style={{
                  background: 'var(--color-primary)',
                  color: 'var(--color-primary-fg)',
                  transition: 'all 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                已複習
              </button>
            </div>
          );
        })}
      </div>

      {reviewItems.length > 8 && (
        <p
          className="text-xs mt-3 text-center"
          style={{ color: 'var(--color-text-muted)' }}
        >
          還有 {reviewItems.length - 8} 題待複習...
        </p>
      )}
    </div>
  );
}
