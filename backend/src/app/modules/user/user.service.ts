import bcryptHelper from '../../helpers/bycrypt.helper';
import AppError from '../../lib/AppError';
import httpStatus from '../../lib/http-status';
import { AuthUser, PaginationOptions } from '../../types';
import { prisma } from '../../prisma';
import {
  CreateUserPayload,
  UpdateUserProfilePayload,
  VisibleUsersFilterQuery,
} from './user.interface';
import { Prisma } from '@prisma/client';
import { calculatePagination } from '../../helpers/pagination.helper';

class UserService {
  private userDefaultSelect = {
    id: true,
    name: true,
    profilePhoto: true,
    gender: true,
    email: true,
    createdAt: true,
    updatedAt: true,
  };

  async createUserIntoDB(payload: CreateUserPayload) {
    const userExistByEmail = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
      },
    });

    if (userExistByEmail)
      throw new AppError(httpStatus.FORBIDDEN, 'This email already used');
    const userExistByUsername = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
      select: {
        id: true,
      },
    });

    if (userExistByUsername)
      throw new AppError(
        httpStatus.FORBIDDEN,
        'This username already used.Please try another one',
      );

    // Insert user
    const createdUser = await prisma.user.create({
      data: {
        ...payload,
        password: bcryptHelper.hash(payload.password),
      },
      select: this.userDefaultSelect,
    });

    if (!createdUser) throw new Error();

    return createdUser;
  }

  async getCurrentUserFromDB(authUser: AuthUser) {
    const user = await prisma.user.findUnique({
      where: {
        id: authUser.id,
      },
      select: this.userDefaultSelect,
    });

    // Check user existence
    if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    return user;
  }

  async updateUserProfileIntoDB(
    authUser: AuthUser,
    payload: UpdateUserProfilePayload,
  ) {
    return await prisma.user.update({
      where: {
        id: authUser.id,
      },
      select: this.userDefaultSelect,
      data: payload,
    });
  }

  async getVisibleUsersFromDB(
    authUser: AuthUser,
    filterQuery: VisibleUsersFilterQuery,
    paginationOptions: PaginationOptions,
  ) {
    const { searchTerm } = filterQuery;
    const { page, limit, skip, sortBy, sortOrder } =
      calculatePagination(paginationOptions);

    const andConditions: Prisma.UserWhereInput[] = [
      {
        id: {
          not: authUser.id,
        },
      },
    ];

    // Filter by email or username on searchTerm  existence
    if (searchTerm?.trim().length) {
      andConditions.push({
        OR: [
          {
            email: searchTerm,
          },
          {
            username: searchTerm,
          },
        ],
      });
    }

    const whereConditions: Prisma.UserWhereInput = {
      AND: andConditions,
    };

    const users = await prisma.user.findMany({
      where: whereConditions,
      orderBy: {
        [sortBy]: sortOrder,
      },
      take: limit,
      skip,
      select: this.userDefaultSelect,
    });

    const totalResults = prisma.user.count();

    const meta = {
      page,
      limit,
      totalResults,
    };

    return {
      data: users,
      meta,
    };
  }
}

export default new UserService();
