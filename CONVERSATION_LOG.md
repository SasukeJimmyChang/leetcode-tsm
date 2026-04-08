# 對話記錄 — TSMC LeetCode Tracker

本文件記錄每次 Claude 與使用者的對話內容、實作進度與決策。

---

## Session 1 — 2026-04-08

### 使用者需求
- 閱讀並理解整個專案內容
- 準備進行後續實作
- 每次對話記錄在 .md 中
- 每次實作須自行測試後再通知使用者

### 專案摘要

**專案名稱**：台積電前端 LeetCode 刷題追蹤器

**技術棧**：Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 + OKLCH 色彩系統

**目前版本**：v1.1.0

**已完成功能**：
1. **Dashboard 首頁** — 必刷進度環形圖、統計卡片、難度分布、14 主題進度條、今日推薦 3 題
2. **題目清單頁** — 14 分類共 90+ 題、篩選/搜尋、進度匯出匯入重置
3. **學習策略頁** — 5 核心策略 + 8 週學習計畫
4. **面試資訊頁** — HackerRank 考試、考古題型、技術棧、主管面試問題、面試流程
5. **間隔複習系統** — Spaced Repetition（1/3/7/14/30 天），Dashboard 顯示待複習題目
6. **通用功能** — Dark mode、響應式設計、動畫效果

**專案結構**：
- `src/app/` — 4 個頁面（Dashboard、Problems、Strategy、Interview）
- `src/components/` — 13 個共用元件（layout 3 + problems 5 + dashboard 5）
- `src/data/problems.ts` — 題目資料庫
- `src/hooks/` — useProgress（進度管理）、useStreak（連續天數）
- `src/types/index.ts` — TypeScript 型別
- `tests/` — smoke test（50+ assertions）

### 狀態
- 已完整閱讀專案，準備接收下一步實作指令
