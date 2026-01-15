import React from 'react';

export const ProjectSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-[3rem] p-10 space-y-10 animate-pulse w-full">
      <div className="flex justify-between items-start">
        <div className="w-20 h-20 bg-slate-100 rounded-[2rem]"></div>
        <div className="flex flex-col items-end space-y-3">
          <div className="h-3 w-24 bg-slate-100 rounded-full"></div>
          <div className="h-4 w-16 bg-slate-100 rounded-full"></div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-10 w-full bg-slate-100 rounded-2xl"></div>
        <div className="h-4 w-2/3 bg-slate-100 rounded-xl"></div>
      </div>

      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-10 h-10 rounded-xl bg-slate-50"></div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
        <div className="h-3 w-32 bg-slate-100 rounded-full"></div>
        <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
      </div>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-20 animate-pulse">
      {/* Header Skeleton */}
      <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-12 px-2">
        <div className="space-y-6 flex-1">
          <div className="flex items-center gap-4">
            <div className="w-10 h-1 bg-slate-200 rounded-full"></div>
            <div className="h-4 w-32 bg-slate-100 rounded-full"></div>
          </div>
          <div className="space-y-3">
            <div className="h-20 w-3/4 bg-slate-100 rounded-[2.5rem]"></div>
            <div className="h-20 w-1/2 bg-slate-100 rounded-[2.5rem]"></div>
          </div>
        </div>
        <div className="w-64 h-24 bg-slate-900/5 rounded-[2.5rem] shrink-0"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <ProjectSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
