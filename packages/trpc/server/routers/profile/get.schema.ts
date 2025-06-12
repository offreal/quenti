import { z } from "zod";

import { USERNAME_REGEXP } from "@quizfit/lib/constants/characters";

export const ZGetSchema = z.object({
  username: z.string().max(40).regex(USERNAME_REGEXP),
});

export type TGetSchema = z.infer<typeof ZGetSchema>;
