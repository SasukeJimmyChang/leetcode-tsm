'use client';

import { useMemo } from 'react';

export function useStreak(completedDates: string[]) {
  return useMemo(() => {
    if (completedDates.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    const sorted = [...completedDates].sort();
    const today = new Date().toISOString().split('T')[0];

    let longestStreak = 1;
    let currentRun = 1;

    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentRun++;
        longestStreak = Math.max(longestStreak, currentRun);
      } else if (diffDays > 1) {
        currentRun = 1;
      }
    }

    // Calculate current streak (consecutive days ending today or yesterday)
    let currentStreak = 0;
    const lastDate = sorted[sorted.length - 1];
    const lastDateObj = new Date(lastDate);
    const todayObj = new Date(today);
    const daysSinceLast =
      (todayObj.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceLast <= 1) {
      currentStreak = 1;
      for (let i = sorted.length - 2; i >= 0; i--) {
        const curr = new Date(sorted[i + 1]);
        const prev = new Date(sorted[i]);
        const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    return { currentStreak, longestStreak };
  }, [completedDates]);
}
