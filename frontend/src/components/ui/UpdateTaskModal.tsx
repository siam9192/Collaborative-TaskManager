import { useForm } from "react-hook-form";
import { TaskPriority, TaskStatus, type Task } from "../../types/task.type";
import { Pencil, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";
import AssignToDialog from "./AssignToDialog";
import { TASK_PROPERTY_LENGTH } from "../../utils/constant";

interface UpdateTaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  assignedToId: string;
}

interface Props {
  task: Task;
  onSubmit: (data: UpdateTaskFormValues) => void;
}

function UpdateTaskModal({ task, onSubmit }: Props) {
  const { register, handleSubmit, setValue, watch, reset } = useForm<UpdateTaskFormValues>({
    defaultValues: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : "",
      assignedToId: task.assignedToId,
    },
  });

  const [isAssignDialog, setIsAssignDialog] = useState(false);

  const titleLength = watch("title")?.length || 0;
  const descLength = watch("description")?.length || 0;

  const handleFormSubmit = (data: UpdateTaskFormValues) => {
    onSubmit(data);
    reset();
    (document.getElementById(`update-task-${task.id}`) as HTMLDialogElement)?.close();
  };

  return (
    <>
      {/* Open Button */}

      <button
        onClick={() =>
          (document.getElementById(`update-task-${task.id}`) as HTMLDialogElement)?.showModal()
        }
        className="btn btn-xs btn-ghost"
      >
        <Pencil size={16} />
      </button>

      {/* Modal */}
      <dialog id={`update-task-${task.id}`} className="modal">
        <div className="modal-box max-w-xl">
          <h3 className="font-bold text-lg mb-4">Update Task</h3>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* ---------- Title ---------- */}
            <div>
              <label className="label font-medium">Title</label>
              <input className="input input-bordered w-full" {...register("title")} />
              <div className="flex justify-between text-xs mt-1 opacity-70">
                <span>
                  {TASK_PROPERTY_LENGTH.title.min}–{TASK_PROPERTY_LENGTH.title.max} characters
                </span>
                <span className={titleLength > TASK_PROPERTY_LENGTH.title.max ? "text-error" : ""}>
                  {titleLength}/{TASK_PROPERTY_LENGTH.title.max}
                </span>
              </div>
            </div>

            {/* ---------- Description ---------- */}
            <div>
              <label className="label font-medium">Description</label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[120px]"
                {...register("description")}
              />
              <div className="flex justify-between text-xs mt-1 opacity-70">
                <span>
                  {TASK_PROPERTY_LENGTH.description.min}–{TASK_PROPERTY_LENGTH.description.max}{" "}
                  characters
                </span>
                <span
                  className={descLength > TASK_PROPERTY_LENGTH.description.max ? "text-error" : ""}
                >
                  {descLength}/{TASK_PROPERTY_LENGTH.description.max}
                </span>
              </div>
            </div>

            {/* ---------- Due Date ---------- */}
            <div>
              <label className="label font-medium">Due Date</label>
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                {...register("dueDate")}
              />
            </div>

            {/* ---------- Priority & Status ---------- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">Priority</label>
                <select className="select select-bordered w-full" {...register("priority")}>
                  {Object.values(TaskPriority).map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label font-medium">Status</label>
                <select className="select select-bordered w-full" {...register("status")}>
                  {Object.values(TaskStatus).map((s) => (
                    <option key={s} value={s}>
                      {s.replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ---------- Assign To ---------- */}
            <div>
              <label className="label font-medium">Assign To</label>
              <button
                type="button"
                onClick={() => setIsAssignDialog(true)}
                className="flex items-center gap-2 px-4 py-3 bg-base-200 hover:bg-base-300 rounded-lg transition"
              >
                <UserPlus size={18} />
                <span className="text-sm">{task.assignedTo?.name || "Select User"}</span>
              </button>
            </div>

            {/* ---------- Actions ---------- */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  (document.getElementById(`update-task-${task.id}`) as HTMLDialogElement)?.close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update Task
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Assign Dialog */}
      {isAssignDialog && (
        <AssignToDialog
          onAssign={(id) => setValue("assignedToId", id)}
          onClose={() => setIsAssignDialog(false)}
        />
      )}
    </>
  );
}

export default UpdateTaskModal;
