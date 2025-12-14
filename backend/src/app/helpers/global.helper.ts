import httpStatus from "../utils/http-status";
import AppError from "../utils/AppError";
import { GLOBAL_ERROR_MESSAGE } from "../utils/constant";

export function isNumber(value: string) {
  return !isNaN(parseInt(value));
}

export function throwInternalError() {
  throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, GLOBAL_ERROR_MESSAGE);
}
