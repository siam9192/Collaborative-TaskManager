import { TaskPriority, TaskStatus } from "../../types/task.type";

export interface TaskFilterValues {
  status?: TaskStatus;
  priority?: TaskPriority;
}

interface FilterModalProps {
  onApply: (filters: TaskFilterValues) => void;
}


function FilterModal({ onApply }: FilterModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    onApply({
      status: formData.get("status") as TaskStatus || undefined,
      priority: formData.get("priority") as TaskPriority || undefined,
    });

    (document.getElementById("filter_modal") as HTMLDialogElement).close();
  };

  return (
    <>
      {/* Open Button */}
      <button
        className="btn btn-sm bg-primary text-white"
        onClick={() =>
          (document.getElementById("filter_modal") as HTMLDialogElement).showModal()
        }
      >
        Filter By
      </button>

      {/* Modal */}
      <dialog id="filter_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Filter Tasks</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Status */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Status</span>
              </label>
              <select name="status" className="select select-bordered mt-1 w-full">
                <option value="">All</option>
                {Object.values(TaskStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="label">
                <span className="label-text font-medium">Priority</span>
              </label>
              <select name="priority" className="select select-bordered mt-1 w-full">
                <option value="">All</option>
                {Object.values(TaskPriority).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

        

            {/* Actions */}
            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  (document.getElementById("filter_modal") as HTMLDialogElement).close()
                }
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Apply
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default FilterModal;
