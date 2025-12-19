import { useEffect, useRef, useState, type UIEvent } from "react";
import { useLocation } from "react-router-dom";
import {
  useGetNotificationsQuery,
  useMarkAsReadNotificationsMutation,
} from "../../query/services/notification.service";
import { useGetUserNotificationsMetadataQuery } from "../../query/services/metadata.service";
import { Bell, BellRing } from "lucide-react";
import type { Notification } from "../../types/notification.type";
import { getTimeAgo } from "../../utils/helper";
import { queryClient } from "../../App";

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { pathname } = useLocation();
  const barRef = useRef<HTMLDivElement>(null);

  // Reset all local states 
  const resetState = () => {
    setPage(1);
    setAllNotifications([]);
    setIsLoadingMore(false);
  };

  // Notifications Query 
  const {
    data: notificationData,
    isLoading,
    isFetching,
    refetch,
  } = useGetNotificationsQuery(
    { page, limit: 5 }
  );

  //  Metadata Query 
  const { data: notificationMetadata } =
    useGetUserNotificationsMetadataQuery();

  const totalUnread = notificationMetadata?.data.totalUnread ?? 0;
  const notifications = notificationData?.data ?? [];
  const meta = notificationData?.meta;
  const totalPages = meta ? Math.ceil(meta.totalResults / meta.limit) : 1;

  const { mutate: markAsReadMutate } =
    useMarkAsReadNotificationsMutation();

  // Close on outside click 
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        barRef.current &&
        !barRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        resetState();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Close on route change 
  useEffect(() => {
    setIsOpen(false);
    resetState();
  }, [pathname]);

  // Merge paginated notifications 
  useEffect(() => {
    if (!isFetching && notifications.length > 0) {
      setAllNotifications((prev) => {
        const existingIds = new Set(prev.map((n) => n.id));
        const newOnes = notifications.filter(
          (n) => !existingIds.has(n.id)
        );
        return [...prev, ...newOnes];
      });
    }
  }, [notifications, isFetching]);


  useEffect(()=>{
    refetch()
  },[isOpen])

 // Infinite scroll 
  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;

    if (
      target.scrollTop + target.clientHeight + 10 >=
        target.scrollHeight &&
      !isFetching &&
      page < totalPages
    ) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setPage((prev) => prev + 1);
        setIsLoadingMore(false);
      }, 500);
    }
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => {
          setIsOpen((prev) => {
            if (prev) resetState();
            return !prev;
          });

          markAsReadMutate(undefined, {
            onSuccess: () =>
              queryClient.invalidateQueries({
                queryKey: [
                  "getUserNotificationsMetadataQuery",
                  "getNotifications",
                ],
              }),
          });
        }}
        className="text-3xl p-2 text-txt-primary rounded-full relative hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
      >
        {totalUnread > 0 ? <BellRing /> : <Bell />}

        {totalUnread > 0 && (
          <div className="size-5 flex justify-center items-center bg-red-500 rounded-full absolute -top-1 right-0 text-[0.6rem] text-white font-semibold">
            {totalUnread}
          </div>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div
          ref={barRef}
          onScroll={handleScroll}
          className="absolute right-0 mt-2 w-72 h-80 overflow-y-auto hide-scrollbar p-3 bg-base-100 shadow-2xl rounded-xl border border-gray-200 dark:border-neutral-700 z-40"
        >
          <h3 className="text-lg font-semibold mb-2">
            Notifications
          </h3>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 dark:bg-neutral-800 rounded-lg h-10"
                />
              ))}
            </div>
          )}

          {/* Notification list */}
          {!isLoading && allNotifications.length > 0 && (
            <div className="space-y-1">
              {allNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-2 hover:bg-gray-50 dark:hover:bg-base-200 rounded-lg transition-colors cursor-pointer"
                >
                  <p className="text-xs text-gray-500">
                    {getTimeAgo(notification.createdAt)}
                  </p>

                  <h2
                    className="text-sm font-medium"
                    dangerouslySetInnerHTML={{
                      __html: notification.title.replace(
                        /"([^"]+)"/,
                        '<span class="font-semibold text-primary">$1</span>'
                      ),
                    }}
                  />

                  {notification.message && (
                    <p className="text-xs text-gray-600">
                      {notification.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && allNotifications.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-6">
              No notifications yet 📭
            </p>
          )}

          {/* Load more */}
          {isLoadingMore && (
            <p className="text-center text-sm mt-2">
              Loading more...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
