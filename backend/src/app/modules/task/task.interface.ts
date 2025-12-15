import { Priority, TaskStatus } from '@prisma/client';

export interface CreateTaskPayload {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  assignedToId: string;
}

export type UpdateTaskPayload = Partial<CreateTaskPayload>;

export interface TaskFilterQuery {
  searchTerm?: string;
  status?: TaskStatus;
  priority?: Priority;
}
