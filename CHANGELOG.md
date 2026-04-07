# Changelog

本文件記錄每次實作更新的時間、功能變更與使用的技術。

---

## [1.1.0] - 2026-04-07

### 新增功能

#### 間隔複習提醒系統（Spaced Repetition）
- 完成題目後，系統自動在 1、3、7、14、30 天後提醒複習
- Dashboard 新增「間隔複習」區塊，顯示待複習題目
- 每題顯示：首次完成日期、複習原因（記憶鞏固階段）、緊急程度
- 紅色（急需複習：1-3 天）、琥珀色（建議複習：7 天）、綠色（可以複習：14-30 天）
- 「已複習」按鈕：點擊後更新最後複習時間，下次到期才再提醒
- 最多顯示 8 題，依緊急程度排序

### 使用技術

| 類別 | 技術 |
|------|------|
| 複習演算法 | Spaced repetition（間隔 1/3/7/14/30 天） |
| 資料儲存 | localStorage 新增 `lastReviewedAt` 欄位 |

---

## [1.0.0] - 2026-04-07

### 新增功能

#### Dashboard 首頁
- 必刷進度環形圖（SVG 繪製，帶數字跳動動畫）
- 統計卡片：已完成數、必刷完成率、連續天數
- 難度分布統計（Easy / Medium / Hard）
- 14 個主題完成度水平進度條
- 今日推薦題目（每日自動從未完成必刷題中挑選 3 題）

#### 題目清單頁
- 14 個主題分類，共 80+ 題，以可展開/收合的 Accordion 呈現
- 每題顯示：題號、題名（連結至 LeetCode）、難度 Badge、必刷/台積考古標籤
- Checkbox 勾選即時儲存至 localStorage
- 篩選功能：全部 / 必刷 / 未完成
- 搜尋功能：依題名或題號搜尋
- 進度匯出（JSON）、匯入、重置

#### 學習策略頁
- 5 個核心刷題策略卡片（按主題刷、解題框架、限時練習、間隔複習、複雜度分析）
- 8 週學習計畫時間軸

#### 台積電面試資訊頁
- HackerRank 考試概況（題數、時間、難度、及格標準、補考機制）
- 考古題型分析（5 大高頻類型）
- 台積電前端技術棧（React / MERN / Flutter / DDD / TDD）
- 主管面試技術問題清單（8 題）
- 面試流程時間線（4 階段）

#### 基礎架構
- Dark mode 切換（localStorage 持久化偏好）
- 響應式設計（Mobile / Tablet / Desktop）
- Staggered fade-in 頁面載入動畫
- Checkbox 打勾彈跳動畫
- 進度數字平滑遞增動畫

### 使用技術

| 類別 | 技術 |
|------|------|
| 框架 | Next.js 16 (App Router) |
| 語言 | TypeScript |
| 樣式 | Tailwind CSS v4 + CSS custom properties |
| 色彩系統 | OKLCH 感知均勻色彩函數 |
| 字體 | Plus Jakarta Sans / IBM Plex Sans / JetBrains Mono (Google Fonts CDN) |
| 狀態管理 | React useState + useCallback + localStorage |
| 動畫 | CSS transitions + keyframes + requestAnimationFrame (數字動畫) |
| 圖表 | 純 SVG（進度環、進度條） |
| 部署 | Vercel（預定） |
