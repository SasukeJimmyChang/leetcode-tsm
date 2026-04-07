'use client';

export default function InterviewPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
          台積電面試資訊
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          HackerRank 考試概況、考古題型分析與面試準備
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* HackerRank Overview */}
        <section
          className="rounded-xl border p-6 animate-fade-in-up stagger-1"
          style={{ borderColor: 'var(--color-border-light)', background: 'var(--color-bg-card)' }}
        >
          <h2
            className="mb-4"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            HackerRank 考試概況
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: '平台', value: 'HackerRank' },
              { label: '題數', value: '3~5 題（近年多為 3 題）' },
              { label: '時間', value: '60~90 分鐘' },
              { label: '難度分布', value: 'Easy x1 + Medium x1~2 + Hard x0~1' },
              { label: '及格標準', value: '100~135 分（硬性門檻）' },
              { label: '補考機制', value: '一年最多 2 次，需主管同意' },
              { label: '可用語言', value: 'JavaScript、Python、Java、C++' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-3 px-3 py-2.5 rounded-lg"
                style={{ background: 'var(--color-bg-secondary)' }}
              >
                <span
                  className="text-xs font-semibold shrink-0 w-20"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {item.label}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div
            className="mt-4 p-3 rounded-lg text-sm leading-relaxed"
            style={{ background: 'var(--color-accent-bg)', color: 'var(--color-accent-text)' }}
          >
            <strong>注意：</strong>題目敘述為英文且篇幅較長，需花 5~15 分鐘閱讀理解。每題有多個 test case，各 case 配分不同，TLE（超時）的 case 不計分。
          </div>
        </section>

        {/* Exam Types */}
        <section
          className="rounded-xl border p-6 animate-fade-in-up stagger-2"
          style={{ borderColor: 'var(--color-border-light)', background: 'var(--color-bg-card)' }}
        >
          <h2
            className="mb-4"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            考古題型分析
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            考題多從 Blind 75 出變化題，高頻類型包括：
          </p>
          <ol className="flex flex-col gap-2.5">
            {[
              { title: '字串處理', desc: 'Sliding Window、Two Pointer', highlight: false },
              { title: '圖論', desc: 'Union-Find、Topological Sort', highlight: true },
              { title: '動態規劃', desc: 'Catalan Number、LIS', highlight: false },
              { title: '矩陣/模擬題', desc: 'Keypad 距離計算等', highlight: false },
              { title: '排程/貪心', desc: 'Task Scheduler 變體', highlight: false },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 px-3 py-2.5 rounded-lg"
                style={{
                  background: item.highlight ? 'var(--color-hard-bg)' : 'var(--color-bg-secondary)',
                }}
              >
                <span
                  className="text-xs font-bold mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: item.highlight ? 'var(--color-hard)' : 'var(--color-primary)',
                    color: 'var(--color-primary-fg)',
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                    {item.title}
                  </span>
                  {item.highlight && (
                    <span
                      className="ml-1.5 text-xs font-semibold"
                      style={{ color: 'var(--color-hard)' }}
                    >
                      — 台積電最高頻考區
                    </span>
                  )}
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Tech Stack */}
        <section
          className="rounded-xl border p-6 animate-fade-in-up stagger-3"
          style={{ borderColor: 'var(--color-border-light)', background: 'var(--color-bg-card)' }}
        >
          <h2
            className="mb-4"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            台積電前端技術棧
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: '前端框架', value: 'React（主力）' },
              { label: '全端架構', value: 'MERN Stack（MongoDB + Express + React + Node.js）' },
              { label: 'App 開發', value: 'Flutter' },
              { label: '開發方法論', value: 'DDD、TDD、Functional Programming（fp-ts）' },
              { label: 'CI/CD', value: 'Cloud Native，參照 CNCF 規範' },
            ].map((item) => (
              <div
                key={item.label}
                className="px-3 py-2.5 rounded-lg"
                style={{ background: 'var(--color-bg-secondary)' }}
              >
                <span
                  className="text-xs font-semibold block mb-0.5"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {item.label}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Interview Questions */}
        <section
          className="rounded-xl border p-6 animate-fade-in-up stagger-4"
          style={{ borderColor: 'var(--color-border-light)', background: 'var(--color-bg-card)' }}
        >
          <h2
            className="mb-4"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            主管面試技術問題（前端方向）
          </h2>
          <div className="flex flex-col gap-2">
            {[
              'JavaScript GC 機制？',
              'Closure 是什麼？實際應用？',
              'Event Loop 與 Task Queue？',
              '無限滾動怎麼實作？Error Handling？效能調校？',
              'React Virtual DOM 原理？',
              'useState vs useReducer 使用時機？',
              '前後端如何實作 Cache？',
              '有用 TDD / DDD 嗎？',
            ].map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 px-3 py-2 rounded-lg"
                style={{ background: 'var(--color-bg-secondary)' }}
              >
                <span
                  className="text-xs mt-0.5 font-medium shrink-0"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  Q{i + 1}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                  {q}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Interview Flow */}
        <section
          className="rounded-xl border p-6 animate-fade-in-up stagger-5"
          style={{ borderColor: 'var(--color-border-light)', background: 'var(--color-bg-card)' }}
        >
          <h2
            className="mb-4"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            面試流程
          </h2>
          <div className="flex flex-col gap-0">
            {[
              { step: '1', title: 'HackerRank 線上考試', desc: '3 題，60-90 分鐘，需達及格標準' },
              { step: '2', title: '主管技術面試', desc: '前端技術問題 + 演算法口述 + 專案經驗' },
              { step: '3', title: 'HR 面試', desc: '薪資期望、工作動機、團隊合作經驗' },
              { step: '4', title: '錄取通知', desc: '約 1-2 週內通知結果' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 py-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: 'var(--color-primary)', color: 'var(--color-primary-fg)' }}
                  >
                    {item.step}
                  </div>
                  {i < 3 && (
                    <div className="w-0.5 flex-1 mt-1" style={{ background: 'var(--color-border)' }} />
                  )}
                </div>
                <div className="pb-2">
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
