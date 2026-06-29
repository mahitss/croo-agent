'use client';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`bg-white/5 shimmer-sweep rounded-lg ${className}`}></div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-border-dark flex flex-col justify-between h-[390px] relative overflow-hidden">
      <div>
        <div className="flex justify-between items-center mb-3">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-8 h-5" />
        </div>
        <Skeleton className="w-3/4 h-6 mb-3" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-5/6 h-4 mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="w-16 h-5" />
          <Skeleton className="w-20 h-5" />
        </div>
      </div>
      <div className="pt-4 border-t border-border-dark">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-20 h-4" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-dashed border-border-dark">
          <Skeleton className="w-24 h-5" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>
    </div>
  );
}
