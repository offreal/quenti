import { z } from "zod";

import { ContainerType } from "@quizfit/prisma/client";

export const ZSetMatchStudyStarredSchema = z.object({
  entityId: z.string(),
  type: z.nativeEnum(ContainerType),
  matchStudyStarred: z.boolean(),
});

export type TSetMatchStudyStarredSchema = z.infer<
  typeof ZSetMatchStudyStarredSchema
>;
