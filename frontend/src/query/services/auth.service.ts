import { userLogin, userLogout, userRegister } from "../../api-services/auth.api.service";
import type { UserLoginPayload, UserRegisterPayload } from "../../types/auth.type";
import type { User } from "../../types/user.type";
import useMutate from "../client/useMutation";

export function useUserRegistrationMutation() {
  return useMutate<User, UserRegisterPayload>(userRegister);
}

export function useUserLoginMutation() {
  return useMutate<User, UserLoginPayload>(userLogin);
}


export function useUserLogoutMutation() {
  return useMutate<null>(userLogout);
}

