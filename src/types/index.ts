export interface Problem {
  id: string;
  leetcodeNumber: number;
  title: string;
  titleZh?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  url: string;
  isMustDo: boolean;
  category: string;
  tags: string[];
  note?: string;
}

export interface Category {
  id: string;
  name: string;
  nameZh: string;
  emoji: string;
  description: string;
  frequency: 'high' | 'medium' | 'low';
  problems: Problem[];
}

export interface ProgressData {
  [problemId: string]: {
    completed: boolean;
    completedAt: string | null;
    lastReviewedAt?: string | null;
  };
}

export interface ReviewItem {
  problemId: string;
  completedAt: string;
  daysSinceCompleted: number;
  daysSinceLastReview: number;
  intervalHit: number;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface StreakData {
  currentStreak: number;
  lastActiveDate: string | null;
  longestStreak: number;
}
