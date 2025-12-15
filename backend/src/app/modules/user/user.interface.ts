import { Gender } from '@prisma/client';

export interface CreateUserPayload {
  name: string;
  username: string;
  email: string;
  password: string;
}

export type UpdateUserProfilePayload = Partial<{
  name: string;
  profilePicture: string;
  gender: Gender;
}>;

export type UsersFilterQuery = {
  searchTerm?: string;
};
