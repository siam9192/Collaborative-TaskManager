import { paginationOptionPicker } from '../../helpers/pagination.helper';
import catchAsync from '../../lib/catchAsync';
import httpStatus from '../../lib/http-status';
import { pick } from '../../lib/pick';
import { sendSuccessResponse } from '../../lib/response';
import taskService from './task.service';

class TaskController {
  createTask = catchAsync(async (req, res) => {
    const result = await taskService.createTask(req.user, req.body);
    sendSuccessResponse(res, {
      message: 'Task created  successfully',
      statusCode: httpStatus.CREATED,
      data: result,
    });
  });
  updateTask = catchAsync(async (req, res) => {
    const result = await taskService.updateTask(
      req.user,
      req.params.id,
      req.body,
    );
    sendSuccessResponse(res, {
      message: 'Task created  successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });
  deleteTask = catchAsync(async (req, res) => {
    const result = await taskService.deleteTask(req.user, req.params.id);
    sendSuccessResponse(res, {
      message: 'Task deleted  successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });
  getAssignedTasks = catchAsync(async (req, res) => {
    const result = await taskService.getAssignedTasks(
      req.user,
      pick(req.query, ['searchTerm', 'status', 'priority']),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Assigned tasks retrieved   successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });
  getCreatedTasks = catchAsync(async (req, res) => {
    const result = await taskService.getCreatedTasks(
      req.user,
      pick(req.query, ['searchTerm', 'status', 'priority']),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Created tasks retrieved   successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

  getOverdueTasks = catchAsync(async (req, res) => {
    const result = await taskService.getCreatedTasks(
      req.user,
      pick(req.query, ['searchTerm', 'status', 'priority']),
      paginationOptionPicker(req.query),
    );
    sendSuccessResponse(res, {
      message: 'Overdue tasks retrieved   successfully',
      statusCode: httpStatus.OK,
      data: result,
    });
  });

}


export default new TaskController()