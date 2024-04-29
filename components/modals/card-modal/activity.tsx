"use client";
import { AuditLog } from "@prisma/client";

import { Skeleton } from "@/components/ui/skeleton";
import { ActivityIcon } from "lucide-react";
import ActivityItem from "@/components/activity-item";

interface ActivityProps {
  items: AuditLog[];
}

export default function Activity({ items }: ActivityProps) {
  return (
    <div className="flex items-start gap-x-3 w-full mb-1">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Activity</p>
        <ol className="mt-2 space-y-4">
          {items.map((item) => (
            <ActivityItem data={item} key={item.id} />
          ))}
        </ol>
      </div>
    </div>
  );
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="bg-neutral-200 h-6 w-6" />
      <div className="w-full">
        <Skeleton className="bg-neutral-200 mb-2 h-6 w-24" />
        <Skeleton className="bg-neutral-200 h-10 w-full" />
      </div>
    </div>
  );
};