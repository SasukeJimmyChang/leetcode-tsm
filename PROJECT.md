# PROJECT — 台積電前端 LeetCode 刷題追蹤器

## 專案簡介

針對台積電 IT 前端工程師面試準備的 LeetCode 刷題追蹤網站。使用者可按主題分類瀏覽題目、勾選完成進度、查看學習策略建議，所有進度儲存在瀏覽器 localStorage，無需後端。

---

## 技術棧

| 類別 | 技術 | 說明 |
|------|------|------|
| **框架** | Next.js 16 (App Router) | React Server Components + Client Components 混合架構 |
| **語言** | TypeScript | 嚴格模式，完整型別定義 |
| **樣式** | Tailwind CSS v4 | Utility-first CSS + CSS custom properties |
| **色彩系統** | OKLCH | 感知均勻調色盤，亮/暗色雙模式 |
| **字體** | Google Fonts CDN | Plus Jakarta Sans（標題）、IBM Plex Sans（內文）、JetBrains Mono（代碼） |
| **狀態管理** | React Hooks + localStorage | useProgress / useStreak 自定義 hooks |
| **動畫** | CSS transitions + keyframes | requestAnimationFrame 用於數字動畫 |
| **圖表** | 純 SVG | 進度環、進度條，無第三方圖表庫 |
| **部署** | Vercel | 靜態生成 (SSG)，零伺服器成本 |

---

## 功能總覽

### 1. Dashboard 首頁 (`/`)
- 必刷進度環形圖（帶動畫的 SVG）
- 統計卡片：已完成數、必刷完成率、學習連續天數
- 難度分布（Easy / Medium / Hard 完成數）
- 14 個主題完成度水平進度條
- 今日推薦 3 題（每日自動從未完成必刷題挑選）

### 2. 題目清單頁 (`/problems`)
- 14 個主題分類，共 80+ 題
- 可展開/收合的 Accordion 介面
- 每題資訊：題號、題名（可直接跳轉 LeetCode）、難度 Badge
- 標籤系統：「必刷」（紫色）、「台積考古」（金色）
- 篩選：全部 / 必刷 / 未完成
- 搜尋：依題名或題號
- 進度管理：匯出 JSON / 匯入 JSON / 重置進度

### 3. 學習策略頁 (`/strategy`)
- 5 個核心刷題策略
- 8 週學習計畫時間軸

### 4. 台積電面試資訊頁 (`/interview`)
- HackerRank 考試概況
- 考古題型分析（5 大高頻類型）
- 台積電前端技術棧
- 主管面試技術問題（8 題）
- 面試流程時間線

### 5. 通用功能
- Dark mode 切換（偏好持久化）
- 響應式設計（Mobile / Tablet / Desktop）
- 頁面載入 staggered fade-in 動畫
- Micro-interactions（checkbox 彈跳、hover 回饋、數字遞增動畫）

---

## 專案結構

```
src/
├── app/                     # Next.js App Router 頁面
│   ├── layout.tsx           # Root layout（字體、主題、導航）
│   ├── page.tsx             # Dashboard 首頁
│   ├── problems/page.tsx    # 題目清單頁
│   ├── strategy/page.tsx    # 學習策略頁
│   └── interview/page.tsx   # 面試資訊頁
├── components/
│   ├── layout/              # Navbar、Footer、ThemeProvider
│   ├── dashboard/           # ProgressRing、StatsCards、CategoryRadar、TodayRecommend
│   └── problems/            # CategorySection、ProblemRow、DifficultyBadge、FilterBar、SearchBar
├── data/
│   └── problems.ts          # 所有題目資料（14 分類、80+ 題）
├── hooks/
│   ├── useProgress.ts       # 進度管理（localStorage CRUD + 匯出匯入）
│   └── useStreak.ts         # 連續天數計算
├── lib/
│   └── utils.ts             # 工具函數（cn、formatDate、getToday）
└── types/
    └── index.ts             # TypeScript 型別定義
```

---

## 資料說明

- **14 個主題**：Array/HashMap、Two Pointers、Sliding Window、Stack、LinkedList、Tree、Heap、Graph、Binary Search、Dynamic Programming、Backtracking、Greedy、Bit Manipulation、Trie/Advanced
- **約 60 題必刷**：標記為面試核心必備
- **台積考古標籤**：標記曾出現在台積電 HackerRank 考試的類似題型
- **出題頻率**：高頻 / 中頻 / 低頻，依面試出現機率分級

---

## 本地開發

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 生產建置
```
