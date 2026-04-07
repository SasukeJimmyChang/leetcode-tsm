'use client';

const strategies = [
  {
    title: '按主題刷，不要亂刷',
    icon: '🎯',
    content:
      '先把核心資料結構與演算法各刷一輪：Array、HashMap、Two Pointers、Sliding Window、Stack、LinkedList、Tree、Graph、BFS/DFS、Binary Search、Dynamic Programming、Backtracking。每個主題先做 5-10 題 Easy/Medium 建立模式感，再挑 Hard。',
  },
  {
    title: '建立解題框架',
    icon: '🧠',
    content:
      '拿到題目先問自己三件事：輸入輸出是什麼、有什麼限制（constraints）、能不能聯想到哪個已知模式。很多題本質上是同一個模板，例如 subarray 相關幾乎都是 sliding window 或 prefix sum。',
  },
  {
    title: '限時 + 不要死磕',
    icon: '⏱️',
    content:
      '給自己 20-30 分鐘，想不出來就看解答，但看完之後一定要自己重寫一遍，隔天再盲寫一次。死磕兩小時對學習效率很差。',
  },
  {
    title: '重複間隔複習',
    icon: '🔁',
    content:
      '這是最關鍵的。做過的題如果不複習，兩週後幾乎忘光。推薦用 spaced repetition 的方式：做完一題，隔 1 天、3 天、7 天各回來重做。有些人會用 Anki 或 Notion 追蹤。',
  },
  {
    title: '手寫複雜度分析',
    icon: '📝',
    content:
      '每題寫完都要能說出 Time Complexity 和 Space Complexity。台積電面試主管會問你為什麼選這個解法、複雜度是多少，說不出來會很減分。',
  },
];

const weeklyPlan = [
  {
    weeks: '第 1-2 週',
    title: '資料結構基礎 + Easy 題型',
    detail: '每日 2-3 題',
    color: 'var(--color-easy)',
  },
  {
    weeks: '第 3-4 週',
    title: 'Medium 題型 + Graph/DP 核心',
    detail: '每日 2 題 + 每週 1 次限時模擬',
    color: 'var(--color-medium)',
  },
  {
    weeks: '第 5-6 週',
    title: 'Hard 題型 + 變化題',
    detail: '每日 1 Hard + 1 Medium，每週 2 次模擬',
    color: 'var(--color-hard)',
  },
  {
    weeks: '第 7-8 週',
    title: '模擬考試 + 前端技術面準備',
    detail: '每週 3 次完整模擬',
    color: 'var(--color-primary)',
  },
];

export default function StrategyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
          學習策略
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          高效刷題的方法與準備計畫
        </p>
      </div>

      {/* Strategy Cards */}
      <div className="flex flex-col gap-4 mb-12">
        {strategies.map((s, i) => (
          <div
            key={s.title}
            className={`rounded-xl border p-5 animate-fade-in-up stagger-${i + 1}`}
            style={{
              borderColor: 'var(--color-border-light)',
              background: 'var(--color-bg-card)',
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">{s.icon}</span>
              <div>
                <h3
                  className="font-semibold mb-2"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {s.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 8 Week Plan */}
      <div className="animate-fade-in-up stagger-6">
        <h2
          className="mb-6"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          8 週學習計畫
        </h2>
        <div className="relative pl-6 border-l-2" style={{ borderColor: 'var(--color-border)' }}>
          {weeklyPlan.map((week, i) => (
            <div key={week.weeks} className="relative pb-8 last:pb-0">
              <div
                className="absolute -left-[calc(0.75rem+1.5px)] top-1 w-3 h-3 rounded-full border-2"
                style={{
                  borderColor: week.color,
                  background: 'var(--color-bg)',
                }}
              />
              <div className="ml-4">
                <span
                  className="inline-block px-2 py-0.5 rounded text-xs font-semibold mb-1.5"
                  style={{ background: 'var(--color-surface)', color: week.color }}
                >
                  {week.weeks}
                </span>
                <h4
                  className="text-sm font-semibold"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                >
                  {week.title}
                </h4>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {week.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
