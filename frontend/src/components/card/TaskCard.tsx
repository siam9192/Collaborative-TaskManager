import { TaskPriority, TaskStatus, type Task } from "../../types/task.type";
import UpdateTaskModal from "../ui/UpdateTaskModal";

import { useCurrentUserProviderContext } from "../../context/CurrentUserProviderContext";
import { DEFAULT_PROFILE_PHOTO } from "../../utils/constant";
import TaskDeleteButton from "../ui/TaskDeleteButton";

function TaskCard({ task }: { task: Task }) {
  const { data } = useCurrentUserProviderContext();

  const currentUser = data?.data!;
  const isOverdue =
    new Date(task.dueDate || task.updatedAt) < new Date() && task.status !== TaskStatus.Completed;

  const isCreator = task.creatorId === currentUser.id;
  const createdAt = new Date(task.createdAt);
  const updatedAt = new Date(task.updatedAt);
  const dueDate = new Date(task.dueDate);

  return (
    <div className="relative p-5 bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-all duration-200 group h-full flex flex-col">
      <div className="grow">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-semibold leading-tight">{task.title}</h3>

        
        </div>

        <p className="mt-2 text-sm opacity-70 line-clamp-2">{task.description}</p>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-4 lg:gap-0 lg:flex-row lg:justify-between lg:items-center text-sm">
        {/* Assignee */}
        {task.assignedTo ? (
          <div>
            <p className="text-xs opacity-60 mb-1">Assigned To:</p>
            <div className="flex items-center gap-2">
              <img
                src={task.assignedTo.profilePhoto ?? DEFAULT_PROFILE_PHOTO}
                alt={task.assignedTo.name}
                className="w-7 h-7 rounded-full ring-2 ring-base-200"
              />
              <span className="opacity-70">
                {task.assignedTo.id === currentUser.id ? "You" : task.assignedTo.name}
              </span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
 <div className="flex gap-2 items-center">
  {
    isOverdue ? <span className=" badge badge-warning">Overdue</span>:null
  }
  {/* Status */}
     <span
  className={`badge badge-outline font-medium    ${task.status === TaskStatus.To_Do && "badge-ghost"}
    ${task.status === TaskStatus.In_Progress && "badge-warning"}
    ${task.status === TaskStatus.Review && "badge-info"}
    ${task.status === TaskStatus.Completed && "badge-success"}`}
>
          {task.status.replace('_',' ')}
        </span>
        {/* Priority */}
        <span
          className={`
            badge badge-outline font-medium
            ${task.priority === TaskPriority.Urgent && "badge-error"}
            ${task.priority === TaskPriority.High && "badge-warning"}
            ${task.priority === TaskPriority.Medium && "badge-info"}
            ${task.priority === TaskPriority.Low && "badge-success"}
          `}
        >
          {task.priority}
        </span>
 </div>
      </div>

      {/*  Footer  */}
      <div className="mt-4 pt-3 border-t border-base-200 flex flex-col md:justify-between gap-2 text-xs text-base-content/60">
        {/* Creator */}
        <span>
          Created by{" "}
          <span className="font-medium text-base-content">
            {isCreator ? "You" : `@${task.creator.username}`}
          </span>
        </span>

        {/* Dates */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
          <span>
            <span className="font-medium">Created:</span> {createdAt.toLocaleDateString()} •{" "}
            {createdAt.toLocaleTimeString()}
          </span>

          <span>
            <span className="font-medium">Updated:</span> {updatedAt.toLocaleDateString()} •{" "}
            {updatedAt.toLocaleTimeString()}
          </span>

          <span>
            <span className="font-medium">Due:</span> {dueDate.toLocaleDateString()}
       
          </span>
        </div>
      </div>

      {/* Actions  */}
      <div className="mt-2  right-3 flex justify-end gap-1 ">
        <UpdateTaskModal task={task} />

        {isCreator && <TaskDeleteButton id={task.id} />}
      </div>
    </div>
  );
}

export default TaskCard;
