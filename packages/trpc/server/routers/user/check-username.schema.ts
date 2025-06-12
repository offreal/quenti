import { z } from "zod";

import { USERNAME_REGEXP } from "@quizfit/lib/constants/characters";

export const ZCheckUsernameSchema = z.object({
  username: z.string().min(3).max(40).regex(USERNAME_REGEXP),
});

export type TCheckUsernameSchema = z.infer<typeof ZCheckUsernameSchema>;
