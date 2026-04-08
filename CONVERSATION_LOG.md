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

---

## Session 2 — 2026-04-08

### 使用者需求
- 上傳 56 張台積電 HackerRank 題庫照片
- 分析題目、對應 LeetCode 相似題型編號
- 加入專案題目資料庫中

### 整理結果

從 56 張照片中識別出 **11 道不重複考古題**，新增為「台積電 HackerRank 考古」分類：

| # | 考古題原名 | 對應 LeetCode | 難度 |
|---|--------|-------------|------|
| 1 | FizzBuzz | #412 Fizz Buzz | Easy |
| 2 | Closest Numbers (Min Abs Diff) | #1200 Minimum Absolute Difference | Easy |
| 3 | Spreadsheet Notation Conversion | #168 Excel Sheet Column Title | Easy |
| 4 | Bucket Fill (strokesRequired) | #733 Flood Fill | Easy |
| 5 | Reversing Linked List | #206 Reverse Linked List | Easy |
| 6 | Simple Cipher (simpleCipher) | #1844 Replace All Digits with Characters | Easy |
| 7 | Connecting Computers (minOperations) | #1319 Number of Operations to Make Network Connected | Medium |
| 8 | Do They Belong (pointsBelong) | #812 Largest Triangle Area | Medium |
| 9 | Star Sum (bestSumKStar) | 星狀圖最大和（自定義題） | Medium |
| 10 | Server Installation (findCentralNode) | #2603 Collect Coins in a Tree | Hard |
| 11 | Server Deployment (getMaxDifficulty) | #2616 Minimize the Maximum Difference of Pairs | Hard |

### 實作變更
- `src/data/problems.ts` — 新增第 15 個分類「TSMC HackerRank」，包含 11 道考古題與 LeetCode 對應
- 每題都含 `note` 欄位說明原始考古題的題目描述
- 所有題目都標記 `tags: ['台積考古']`
- `npm run build` 測試通過

### 狀態
- 考古題已加入專案，準備接收下一步實作指令

---

## Session 3 — 2026-04-08

### 使用者需求
1. 台積實戰考題要與台積考古區分（新增「台積實戰」標籤）
2. 手機上要能顯示所有 tag（原本台積考古 tag 在手機上被 hidden）
3. 推送到 main 分支

### 實作變更
- `src/app/globals.css` — 新增 `--color-tsmc-real` / `--color-tsmc-real-bg` 色彩變數（紅色系，與考古金色區分）
- `src/components/problems/ProblemRow.tsx`：
  - 移除台積考古標籤的 `hidden sm:` 前綴，手機也能顯示
  - 新增「台積實戰」標籤渲染（紅色系）
  - tag 容器改為 `flex-wrap` 確保多個 tag 不會被截斷
- `src/data/problems.ts` — TSMC HackerRank 分類的題目改用 `tags: ['台積實戰']`
- `npm run build` 通過
- smoke test 71/71 全部通過

### 標籤說明
- **台積考古**（金色）：其他分類中與台積考試類似的 LeetCode 題目
- **台積實戰**（紅色）：從 HackerRank 考試截圖直接對應的實際考題

### 狀態
- 已完成，已推送到 main
