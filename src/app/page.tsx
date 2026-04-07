'use client';

import { useProgress } from '@/hooks/useProgress';
import { useStreak } from '@/hooks/useStreak';
import { totalProblems, totalMustDo } from '@/data/problems';
import { ProgressRing } from '@/components/dashboard/ProgressRing';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { CategoryRadar } from '@/components/dashboard/CategoryRadar';
import { TodayRecommend } from '@/components/dashboard/TodayRecommend';
import { ReviewSection } from '@/components/dashboard/ReviewSection';

export default function DashboardPage() {
  const { completedCount, isCompleted, getCompletedDates, getReviewItems, markReviewed } = useProgress();
  const reviewItems = getReviewItems();
  const dates = getCompletedDates();
  const { currentStreak } = useStreak(dates);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-10 animate-fade-in-up">
        <h1 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
          大廠面試刷題清單
        </h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          共 {totalProblems} 題 &middot; 必刷 {totalMustDo} 題 &middot; 已完成{' '}
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            {completedCount}
          </span>{' '}
          題
        </p>
      </div>

      {/* Progress Ring */}
      <div className="flex justify-center mb-10 animate-fade-in-up stagger-1">
        <ProgressRing completed={completedCount} total={totalMustDo} label="必刷進度" />
      </div>

      {/* Stats Cards */}
      <div className="mb-8">
        <StatsCards
          completedCount={completedCount}
          isCompleted={isCompleted}
          currentStreak={currentStreak}
        />
      </div>

      {/* Review Section */}
      {reviewItems.length > 0 && (
        <div className="mb-8">
          <ReviewSection reviewItems={reviewItems} onMarkReviewed={markReviewed} />
        </div>
      )}

      {/* Category Progress + Today Recommend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CategoryRadar isCompleted={isCompleted} />
        <TodayRecommend isCompleted={isCompleted} />
      </div>
    </div>
  );
}
