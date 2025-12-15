import { paginationOptionPicker } from "../../helpers/pagination.helper";
import catchAsync from "../../lib/catchAsync";
import httpStatus from "../../lib/http-status";
import { sendSuccessResponse } from "../../lib/response";
import notificationService from "./notification.service";

class NotificationController {
     getNotifications = catchAsync(async (req, res) => {
     const result = await notificationService.getNotifications(req.user,paginationOptionPicker(req.query));
     sendSuccessResponse(res, {
      message: 'Notifications retrieved successfully',
      statusCode: httpStatus.OK,
      ...result
    });
     
});

}


export default new NotificationController()