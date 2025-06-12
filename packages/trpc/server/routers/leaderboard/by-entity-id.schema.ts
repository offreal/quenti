import { z } from "zod";

import { LeaderboardType } from "@quizfit/prisma/client";

export const ZByEntityIdSchema = z.object({
  mode: z.nativeEnum(LeaderboardType),
  entityId: z.string(),
});

export type TByEntityIdSchema = z.infer<typeof ZByEntityIdSchema>;
