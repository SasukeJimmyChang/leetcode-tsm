/**
 * Smoke test — 驗證所有頁面 HTML 渲染是否正確
 * 無需瀏覽器，直接對 Next.js server 發 HTTP 請求
 */

const BASE = process.env.TEST_BASE || 'http://localhost:3457';

const tests = [];
let passed = 0;
let failed = 0;

function assert(name, condition, detail = '') {
  if (condition) {
    passed++;
    tests.push({ name, status: 'PASS' });
  } else {
    failed++;
    tests.push({ name, status: 'FAIL', detail });
  }
}

async function fetchPage(path) {
  const res = await fetch(`${BASE}${path}`);
  const html = await res.text();
  return { status: res.status, html };
}

async function run() {
  console.log('=== TSMC LeetCode Tracker Smoke Tests ===\n');

  // ---- 1. Dashboard (/) ----
  {
    const { status, html } = await fetchPage('/');
    assert('Dashboard: HTTP 200', status === 200, `Got ${status}`);
    assert('Dashboard: 有標題「大廠面試刷題清單」', html.includes('大廠面試刷題清單'));
    assert('Dashboard: 有必刷進度環 (SVG circle)', html.includes('<circle') && html.includes('stroke-dasharray'));
    assert('Dashboard: 有統計卡片「已完成」', html.includes('已完成'));
    assert('Dashboard: 有統計卡片「必刷完成率」', html.includes('必刷完成率'));
    assert('Dashboard: 有統計卡片「連續天數」', html.includes('連續天數'));
    assert('Dashboard: 有難度分布區塊', html.includes('難度分布'));
    assert('Dashboard: 有各主題完成度', html.includes('各主題完成度'));
    assert('Dashboard: 有今日推薦區塊', html.includes('今日推薦'));
    assert('Dashboard: 有 Easy/Medium/Hard 標示', html.includes('Easy') && html.includes('Medium') && html.includes('Hard'));
  }

  // ---- 2. Problems (/problems) ----
  {
    const { status, html } = await fetchPage('/problems');
    assert('Problems: HTTP 200', status === 200, `Got ${status}`);
    assert('Problems: 有頁面標題「題目清單」', html.includes('題目清單'));
    assert('Problems: 有篩選按鈕「全部」', html.includes('全部'));
    assert('Problems: 有篩選按鈕「必刷」', html.includes('必刷'));
    assert('Problems: 有篩選按鈕「未完成」', html.includes('未完成'));
    assert('Problems: 有搜尋框 placeholder', html.includes('搜尋題目名稱或題號'));
    assert('Problems: 有匯出進度按鈕', html.includes('匯出進度'));
    assert('Problems: 有匯入進度按鈕', html.includes('匯入進度'));
    assert('Problems: 有重置進度按鈕', html.includes('重置進度'));

    // 14 categories
    assert('Problems: 有 Array / HashMap 主題', html.includes('Array / HashMap'));
    assert('Problems: 有 Two Pointers 主題', html.includes('Two Pointers'));
    assert('Problems: 有 Sliding Window 主題', html.includes('Sliding Window'));
    assert('Problems: 有 Stack 主題', html.includes('Stack') && html.includes('括號匹配'));
    assert('Problems: 有 LinkedList 主題', html.includes('LinkedList'));
    assert('Problems: 有 Tree 主題', html.includes('Tree') && html.includes('遞迴思維'));
    assert('Problems: 有 Heap 主題', html.includes('Heap / Priority Queue'));
    assert('Problems: 有 Graph 主題', html.includes('Graph') && html.includes('台積電重點考區'));
    assert('Problems: 有 Binary Search 主題', html.includes('Binary Search'));
    assert('Problems: 有 Dynamic Programming 主題', html.includes('Dynamic Programming'));
    assert('Problems: 有 Backtracking 主題', html.includes('Backtracking'));
    assert('Problems: 有 Greedy 主題', html.includes('Greedy'));
    assert('Problems: 有 Bit Manipulation 主題', html.includes('Bit Manipulation'));
    assert('Problems: 有 Trie / Advanced 主題', html.includes('Trie / Advanced'));

    // Sample problems
    assert('Problems: 有 Two Sum 題目', html.includes('Two Sum'));
    assert('Problems: 有 LeetCode 連結', html.includes('leetcode.com/problems/'));
    assert('Problems: 有頻率標籤「高頻」', html.includes('高頻'));
    assert('Problems: 有 checkbox (input)', html.includes('type="checkbox"'));

    // Tags
    assert('Problems: 有「台積考古」標籤', html.includes('台積考古'));
  }

  // ---- 3. Strategy (/strategy) ----
  {
    const { status, html } = await fetchPage('/strategy');
    assert('Strategy: HTTP 200', status === 200, `Got ${status}`);
    assert('Strategy: 有頁面標題「學習策略」', html.includes('學習策略'));
    assert('Strategy: 有策略 1「按主題刷，不要亂刷」', html.includes('按主題刷，不要亂刷'));
    assert('Strategy: 有策略 2「建立解題框架」', html.includes('建立解題框架'));
    assert('Strategy: 有策略 3「限時 + 不要死磕」', html.includes('限時'));
    assert('Strategy: 有策略 4「重複間隔複習」', html.includes('重複間隔複習'));
    assert('Strategy: 有策略 5「手寫複雜度分析」', html.includes('手寫複雜度分析'));
    assert('Strategy: 有 8 週學習計畫標題', html.includes('8 週學習計畫'));
    assert('Strategy: 有第 1-2 週', html.includes('第 1-2 週'));
    assert('Strategy: 有第 7-8 週', html.includes('第 7-8 週'));
  }

  // ---- 4. Interview (/interview) ----
  {
    const { status, html } = await fetchPage('/interview');
    assert('Interview: HTTP 200', status === 200, `Got ${status}`);
    assert('Interview: 有頁面標題「台積電面試資訊」', html.includes('台積電面試資訊'));
    assert('Interview: 有 HackerRank 考試概況', html.includes('HackerRank 考試概況'));
    assert('Interview: 有題數資訊', html.includes('3~5 題'));
    assert('Interview: 有時間資訊', html.includes('60~90 分鐘'));
    assert('Interview: 有及格標準', html.includes('100~135 分'));
    assert('Interview: 有考古題型分析', html.includes('考古題型分析'));
    assert('Interview: 有圖論為最高頻考區', html.includes('台積電最高頻考區'));
    assert('Interview: 有前端技術棧', html.includes('台積電前端技術棧'));
    assert('Interview: 有 React 技術', html.includes('React（主力）'));
    assert('Interview: 有主管面試問題', html.includes('主管面試技術問題'));
    assert('Interview: 有 Closure 問題', html.includes('Closure'));
    assert('Interview: 有 Event Loop 問題', html.includes('Event Loop'));
    assert('Interview: 有面試流程', html.includes('面試流程'));
  }

  // ---- 5. Layout / Navbar ----
  {
    const { html } = await fetchPage('/');
    assert('Layout: 有 Navbar「Dashboard」連結', html.includes('Dashboard'));
    assert('Layout: 有 Navbar「題目清單」連結', html.includes('題目清單'));
    assert('Layout: 有 Navbar「學習策略」連結', html.includes('學習策略'));
    assert('Layout: 有 Navbar「面試資訊」連結', html.includes('面試資訊'));
    assert('Layout: 有 Dark mode 切換按鈕', html.includes('Toggle theme'));
    assert('Layout: 有 Footer', html.includes('TSMC Frontend LeetCode Tracker'));
    assert('Layout: 載入 Google Fonts', html.includes('fonts.googleapis.com'));
    assert('Layout: 使用 OKLCH 色彩', html.includes('oklch'));
  }

  // ---- 6. 404 ----
  {
    const { status } = await fetchPage('/nonexistent-page');
    assert('404: 不存在的頁面回傳 404', status === 404, `Got ${status}`);
  }

  // ---- Report ----
  console.log('');
  for (const t of tests) {
    const icon = t.status === 'PASS' ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
    console.log(`  [${icon}] ${t.name}${t.detail ? ` (${t.detail})` : ''}`);
  }
  console.log(`\n=== Results: ${passed} passed, ${failed} failed, ${passed + failed} total ===`);

  if (failed > 0) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Test runner error:', err);
  process.exit(1);
});
