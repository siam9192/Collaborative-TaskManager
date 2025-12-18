import { toast } from "sonner";

export function calculateTotalPages(total: number, limit: number) {
  return Math.floor(total / limit);
}

export const getTimeAgo = (date: string | Date): string => {
  const currentDate = new Date().getTime();
  const targetDate = new Date(date).getTime();
  const difference = currentDate - targetDate; // Time difference in milliseconds

  const minutes = 60 * 1000;
  const hours = 60 * minutes;
  const days = 24 * hours;

  if (difference >= days) {
    return `${Math.floor(difference / days)} days ago`;
  }
  if (difference >= hours) {
    return `${Math.floor(difference / hours)} hours ago`;
  }
  if (difference >= minutes) {
    return `${Math.floor(difference / minutes)} minutes ago`;
  }

  return `just now`;
};

type NotificationToastProps = {
  title: string;
  message?: string;
  icon?: React.ReactNode;
  duration?: number;
};

export const notify = ({ title, message, icon, duration = 4000 }: NotificationToastProps) => {
  toast.custom(
    (t) => (
      <div className="flex w-full max-w-sm gap-3 rounded-xl border bg-base-300 p-4 shadow-lg">
        <div className="mt-1">{icon}</div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-base-content">{title}</p>
          {message && <p className="mt-1 text-sm text-base-content">{message}</p>}
        </div>

        <button onClick={() => toast.dismiss(t)} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>
    ),
    { duration },
  );
};
