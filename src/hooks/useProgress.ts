'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProgressData, ReviewItem } from '@/types';
import { getToday } from '@/lib/utils';

const STORAGE_KEY = 'tsmc-leetcode-progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress, loaded]);

  const toggleProblem = useCallback((problemId: string) => {
    setProgress((prev) => {
      const current = prev[problemId];
      if (current?.completed) {
        const next = { ...prev };
        delete next[problemId];
        return next;
      }
      return {
        ...prev,
        [problemId]: { completed: true, completedAt: getToday() },
      };
    });
  }, []);

  const isCompleted = useCallback(
    (problemId: string) => !!progress[problemId]?.completed,
    [progress]
  );

  const completedCount = Object.values(progress).filter((p) => p.completed).length;

  const getCompletedDates = useCallback((): string[] => {
    const dates = new Set<string>();
    Object.values(progress).forEach((p) => {
      if (p.completedAt) dates.add(p.completedAt);
    });
    return Array.from(dates).sort();
  }, [progress]);

  const exportProgress = useCallback(() => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leetcode-progress-${getToday()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [progress]);

  const importProgress = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ProgressData;
        setProgress(data);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({});
  }, []);

  const getReviewItems = useCallback((): ReviewItem[] => {
    const today = new Date(getToday());
    const items: ReviewItem[] = [];

    for (const [problemId, data] of Object.entries(progress)) {
      if (!data.completed || !data.completedAt) continue;

      const completedDate = new Date(data.completedAt);
      const daysSince = Math.floor(
        (today.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Spaced repetition intervals: 1, 3, 7, 14, 30 days
      const intervals = [1, 3, 7, 14, 30];
      const lastReviewedDay = data.lastReviewedAt
        ? Math.floor(
            (today.getTime() - new Date(data.lastReviewedAt).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : daysSince;

      for (const interval of intervals) {
        if (daysSince >= interval && lastReviewedDay >= interval) {
          let reason: string;
          if (interval === 1) reason = '隔 1 天複習 — 鞏固短期記憶';
          else if (interval === 3) reason = '隔 3 天複習 — 強化記憶連結';
          else if (interval === 7) reason = '隔 7 天複習 — 轉化為長期記憶';
          else if (interval === 14) reason = '隔 14 天複習 — 確認長期記憶';
          else reason = '隔 30 天複習 — 最終確認';

          items.push({
            problemId,
            completedAt: data.completedAt,
            daysSinceCompleted: daysSince,
            daysSinceLastReview: lastReviewedDay,
            intervalHit: interval,
            reason,
            urgency:
              interval <= 3 ? 'high' : interval <= 7 ? 'medium' : 'low',
          });
          break; // Only show the most urgent interval
        }
      }
    }

    // Sort by urgency (high first), then by days since last review (most overdue first)
    return items.sort((a, b) => {
      const urgencyOrder = { high: 0, medium: 1, low: 2 };
      if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
        return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
      }
      return b.daysSinceLastReview - a.daysSinceLastReview;
    });
  }, [progress]);

  const markReviewed = useCallback((problemId: string) => {
    setProgress((prev) => {
      const current = prev[problemId];
      if (!current) return prev;
      return {
        ...prev,
        [problemId]: { ...current, lastReviewedAt: getToday() },
      };
    });
  }, []);

  return {
    progress,
    loaded,
    toggleProblem,
    isCompleted,
    completedCount,
    getCompletedDates,
    getReviewItems,
    markReviewed,
    exportProgress,
    importProgress,
    resetProgress,
  };
}
