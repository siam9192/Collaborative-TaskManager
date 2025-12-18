import { useState, useEffect } from "react";
import { TaskPriority, TaskStatus, type Task, type TaskUser } from "../../types/task.type";

import CreatedTasks from "../sections/CreatedTasks";
import AssignedTasks from "../sections/AssignedTasks";
import OverdueTasks from "../sections/OverdueTasks";
import CreateTaskModal from "../ui/CreateTaskModal";

// Mock current user
const currentUser: TaskUser = {
  id: "user-123",
  name: "Siam Hasan",
  username: "siamTy",
  profilePicture: "https://i.pravatar.cc/150?img=12",
};

// Mock tasks
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design Dashboard",
    description: "Create UI for admin dashboard",
    priority: TaskPriority.High,
    status: TaskStatus.In_Progress,
    createdAt: "2025-12-01",
    updatedAt: "2025-12-05",
    creatorId: "user-456",
    assignedToId: "user-123",
    creator: {
      id: "user-456",
      name: "Alice",
      username: "alice123",
      profilePicture: "https://i.pravatar.cc/150?img=5",
    },
    assignedTo: currentUser,
  },
  {
    id: "2",
    title: "Write API Docs",
    description: "Document all endpoints",
    priority: TaskPriority.Medium,
    status: TaskStatus.To_Do,
    createdAt: "2025-12-01",
    updatedAt: "2025-12-02",
    creatorId: "user-123",
    assignedToId: "user-456",
    creator: currentUser,
    assignedTo: {
      id: "user-456",
      name: "Alice",
      username: "alice123",
      profilePicture: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    id: "3",
    title: "Fix Bugs",
    description: "Fix login and payment bugs",
    priority: TaskPriority.Urgent,
    status: TaskStatus.To_Do,
    createdAt: "2025-11-28",
    updatedAt: "2025-11-29",
    creatorId: "user-123",
    assignedToId: "user-123",
    creator: currentUser,
    assignedTo: currentUser,
  },
];

export default function TasksPage() {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);

  useEffect(() => {
    const assigned = mockTasks.filter((task) => task.assignedTo.id === currentUser.id);
    const created = mockTasks.filter((task) => task.creator.id === currentUser.id);
    const overdue = mockTasks.filter(
      (task) => new Date(task.updatedAt) < new Date() && task.status !== TaskStatus.Completed,
    );

    setAssignedTasks(assigned);
    setCreatedTasks(created);
    setOverdueTasks(overdue);
  }, []);

  return (
    <div className=" mx-auto space-y-10">
      {/* Assigned Tasks */}

      <CreateTaskModal />

      <CreatedTasks tasks={createdTasks} />
      <AssignedTasks tasks={assignedTasks} />
      <OverdueTasks tasks={overdueTasks} />
    </div>
  );
}
