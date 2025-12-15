
import AppError from "../../lib/AppError";
import httpStatus from "../../lib/http-status";
import { AuthUser, PaginationOptions } from "../../types";
import userRepository from "../user/user.repository";
import { CreateNotificationPayload } from "./notification.interface";
import notificationRepository from "./notification.repository";
import { calculatePagination } from "../../helpers/pagination.helper";

class NotificationService  {
 async createNotification (payload:CreateNotificationPayload) {
    // Check user existence
    const isUserExist =  userRepository.isUserExistById(payload.userId)
    if(!isUserExist) throw new AppError(httpStatus.NOT_FOUND,"User not found") 
    return await notificationRepository.create(payload)

 }

 async getNotifications (authUser:AuthUser,paginationOptions:PaginationOptions)  {
  return await notificationRepository.findUserNotifications(authUser.id,calculatePagination(paginationOptions))
 }

}


export default new NotificationService()