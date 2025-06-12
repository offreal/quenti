import type { User } from "@quizfit/prisma/client";

/// Legacy
export const avatarUrl = (user: Pick<User, "username" | "image">): string =>
  user.image!;
