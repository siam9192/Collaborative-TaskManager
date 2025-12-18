import { Pencil, Trash2, Clock } from "lucide-react";
import { TaskStatus, type Task, type TaskUser } from "../../types/task.type";
import UpdateTaskModal from "../ui/UpdateTaskModal";

function TaskCard({ task }: { task: Task }) {
  const currentUser: TaskUser = {
    id: "user-123",
    name: "Siam Hasan",
    username: "siamTy",
    profilePicture: "https://i.pravatar.cc/150?img=12",
  };

  const isOverdue =
    new Date(task.dueDate || task.updatedAt) < new Date() && task.status !== TaskStatus.Completed;

  const isOwner = task.creator.id === currentUser.id;

  return (
    <div className="relative p-5 bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-lg font-semibold leading-tight">{task.title}</h3>

        {isOverdue && <span className="text-warning gap-1">Overdue</span>}
      </div>

      <p className="mt-2 text-sm opacity-70 line-clamp-2">{task.description}</p>

      <div className="mt-4 flex justify-between items-center text-sm">
        {/* Assignee */}
        <div className="flex items-center gap-2">
          <img
            src={task.assignedTo.profilePicture}
            alt={task.assignedTo.name}
            className="w-7 h-7 rounded-full ring-2 ring-base-200"
          />
          <span className="opacity-70">
            {task.assignedTo.id === currentUser.id ? "You" : task.assignedTo.name}
          </span>
        </div>

        {/* Priority */}
        <span
          className={`
            badge badge-outline font-medium
            ${task.priority === "Urgent" && "badge-error"}
            ${task.priority === "High" && "badge-warning"}
            ${task.priority === "Medium" && "badge-info"}
            ${task.priority === "Low" && "badge-success"}
          `}
        >
          {task.priority}
        </span>
      </div>

      {/* ---------- Footer ---------- */}
      <div className="mt-3 flex justify-between items-center text-xs opacity-60">
        <span>
          Created by{" "}
          <span className="font-medium">
            {task.creator.id === currentUser.id ? "You" : task.creator.name}
          </span>
        </span>

        <span>Due: {new Date(task.updatedAt).toLocaleDateString()}</span>
      </div>

      {/* Actions  */}
      <div className="mt-2  right-3 flex justify-end gap-1 ">
        <UpdateTaskModal task={task} onSubmit={() => {}} />

        {isOwner && (
          <button className="btn btn-xs btn-ghost text-error">
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
