import { calculatePagination } from '../../helpers/pagination.helper';
import AppError from '../../lib/AppError';
import httpStatus from '../../lib/http-status';
import { AuthUser, PaginationOptions } from '../../types';
import {
  CreateTaskPayload,
  TaskFilterQuery,
  UpdateTaskPayload,
} from './task.interface';
import taskRepository from './task.repository';

class TaskService {
  async createTask(authUser: AuthUser, payload: CreateTaskPayload) {
    // Check assigned user existence
    const assignedUser = await taskRepository.findById(authUser.id);
    if (!assignedUser) {
      throw new AppError(httpStatus.NOT_FOUND, 'Assigned to user not found');
    }

    // Create task
    return taskRepository.create({
      ...payload,
      creatorId: authUser.id,
    });
  }

  async updateTask(
    authUser: AuthUser,
    taskId: string,
    payload: UpdateTaskPayload,
  ) {
    // Fetch task
    const task = await taskRepository.findByIdWithOwnership(taskId);
    if (!task) {
      throw new AppError(httpStatus.NOT_FOUND, 'Task not found');
    }

    // Authorization: only creator can update
    if (task.creatorId !== authUser.id) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not allowed to update this task',
      );
    }

    // Validate assigned user if changed
    const { assignedToId } = payload;
    if (assignedToId && assignedToId !== task.assignedToId) {
      const assignedUserExists = await taskRepository.findById(assignedToId);
      if (!assignedUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Assigned user not found');
      }
    }

    // Update task
    return taskRepository.updateById(taskId, payload);
  }

  async deleteTask(authUser: AuthUser, taskId: string) {
    const task = await taskRepository.findByIdWithOwnership(taskId);
    if (!task) {
      throw new AppError(httpStatus.NOT_FOUND, 'Task not found');
    }

    // Authorization: only creator can delete
    if (task.creatorId !== authUser.id) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not allowed to delete this task',
      );
    }

    // Delete task
    await taskRepository.deleteById(taskId);

    return { success: true };
  }

  async getAssignedTasks(
    authUser: AuthUser,
    filterQuery: TaskFilterQuery,
    paginationOptions: PaginationOptions,
  ) {
    return await taskRepository.findAssignedTasks(
      authUser.id,
      filterQuery,
      calculatePagination(paginationOptions),
    );
  }

  async getCreatedTasks(
    authUser: AuthUser,
    filterQuery: TaskFilterQuery,
    paginationOptions: PaginationOptions,
  ) {
    return await taskRepository.findCreatedTasks(
      authUser.id,
      filterQuery,
      calculatePagination(paginationOptions),
    );
  }

  async getOverDueTasks(
    authUser: AuthUser,
    filterQuery: TaskFilterQuery,
    paginationOptions: PaginationOptions,
  ) {
    const result = await taskRepository.findOverdueTasks(
      authUser.id,
      filterQuery,
      calculatePagination(paginationOptions),
    );
    result.data.map((_) => ({ ..._, isCreator: _.creatorId === authUser.id }));
    return result;
  }
}

export default new TaskService();
