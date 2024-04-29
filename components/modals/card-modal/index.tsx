"use client";

import { useQuery } from "@tanstack/react-query";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithList } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { AuditLog } from "@prisma/client";

import Header from "./header";
import Description from "./description";
import Actions from "./actions";
import Activity from "./activity";
import { stat } from "fs";

export const CardModal = () => {
  //const { isOpen, onClose, id } = useCardModal();
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onClose = useCardModal((state) => state.onClose);

  const { data: cardData, isLoading } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  const { data: auditLogs, isLoading: auditLogsIsLoading } = useQuery<
    AuditLog[]
  >({
    queryKey: ["card-logs", "audit-logs", id],
    queryFn: () => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {isLoading || !cardData ? (
          <Header.Skeleton />
        ) : (
          <Header data={cardData} />
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3 ">
            <div className="w-full space-y-6 h-full">
              <div>
                {isLoading || !cardData ? (
                  <Description.Skeleton />
                ) : (
                  <Description data={cardData} />
                )}
                {auditLogsIsLoading || !auditLogs ? (
                  <Activity.Skeleton />
                ) : (
                  <Activity items={auditLogs} />
                )}
              </div>
            </div>
          </div>

          {isLoading || !cardData ? (
            <Actions.Skeleton />
          ) : (
            <Actions data={cardData} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};