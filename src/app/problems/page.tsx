'use client';

import { useState, useMemo, useRef } from 'react';
import { categories } from '@/data/problems';
import { useProgress } from '@/hooks/useProgress';
import { CategorySection } from '@/components/problems/CategorySection';
import { FilterBar, FilterType } from '@/components/problems/FilterBar';
import { SearchBar } from '@/components/problems/SearchBar';

export default function ProblemsPage() {
  const { isCompleted, toggleProblem, exportProgress, importProgress, resetProgress } =
    useProgress();
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const filteredCategories = useMemo(() => {
    return categories.map((cat) => {
      const filtered = cat.problems.filter((p) => {
        if (filter === 'must-do' && !p.isMustDo) return false;
        if (filter === 'incomplete' && isCompleted(p.id)) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            p.title.toLowerCase().includes(q) ||
            p.leetcodeNumber.toString().includes(q)
          );
        }
        return true;
      });
      return { category: cat, problems: filtered };
    });
  }, [filter, search, isCompleted]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8 animate-fade-in-up">
        <h1 style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}>
          題目清單
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          按主題分類瀏覽，勾選已完成的題目
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6 animate-fade-in-up stagger-1">
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        <div className="flex-1 w-full sm:w-auto">
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 animate-fade-in-up stagger-2">
        <button
          onClick={exportProgress}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:opacity-80 active:scale-95"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
            transition: 'all 200ms ease',
          }}
        >
          匯出進度
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:opacity-80 active:scale-95"
          style={{
            borderColor: 'var(--color-border)',
            color: 'var(--color-text-secondary)',
            transition: 'all 200ms ease',
          }}
        >
          匯入進度
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) importProgress(file);
          }}
        />
        <button
          onClick={() => {
            if (confirm('確定要重置所有進度嗎？此操作無法復原。')) {
              resetProgress();
            }
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:opacity-80 active:scale-95"
          style={{
            borderColor: 'var(--color-hard-bg)',
            color: 'var(--color-hard)',
            transition: 'all 200ms ease',
          }}
        >
          重置進度
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {filteredCategories.map(({ category, problems }) => (
          <CategorySection
            key={category.id}
            category={category}
            filteredProblems={problems}
            isCompleted={isCompleted}
            onToggle={toggleProblem}
            defaultOpen={false}
          />
        ))}
      </div>
    </div>
  );
}
