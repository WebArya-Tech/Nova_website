import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';

export { Badge, Button, Input };

// Alias TextArea → Textarea to match blog component imports
export const TextArea = Textarea;

// Custom Pagination component used by BlogListPage
export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [9, 18, 27],
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  pageSize?: number;
  onPageSizeChange?: (s: number) => void;
  pageSizeOptions?: number[];
}) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-8">
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 0}
          className="px-3 py-1.5 text-sm rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
        >
          ← Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-md border transition-colors',
              p === page
                ? 'bg-primary text-white border-primary'
                : 'border-gray-200 hover:bg-gray-50'
            )}
          >
            {p + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages - 1}
          className="px-3 py-1.5 text-sm rounded-md border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
        >
          Next →
        </button>
      </div>
      {onPageSizeChange && (
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="text-sm border border-gray-200 rounded-md px-2 py-1.5"
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>{s} / page</option>
          ))}
        </select>
      )}
    </div>
  );
};

// Blog Card with optional hover effect
export const Card = ({
  children,
  className,
  hover,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) => (
  <div
    className={cn(
      'bg-white rounded-xl p-5 border border-gray-200',
      hover && 'hover:shadow-md transition-shadow cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

// Simple loading spinner
export const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClass = size === 'lg' ? 'w-10 h-10' : size === 'sm' ? 'w-4 h-4' : 'w-6 h-6';
  return (
    <div className="flex justify-center py-12">
      <div className={cn('animate-spin rounded-full border-4 border-gray-200 border-t-primary', sizeClass)} />
    </div>
  );
};

// Tag badge
export const TagBadge = ({ tag }: { tag: string }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
    #{tag}
  </span>
);
