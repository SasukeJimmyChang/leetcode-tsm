'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProgressData } from '@/types';
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

  return {
    progress,
    loaded,
    toggleProblem,
    isCompleted,
    completedCount,
    getCompletedDates,
    exportProgress,
    importProgress,
    resetProgress,
  };
}
