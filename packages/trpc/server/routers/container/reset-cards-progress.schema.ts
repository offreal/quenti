import { z } from "zod";

import { ContainerType } from "@quizfit/prisma/client";

export const ZResetCardsProgressSchema = z.object({
  entityId: z.string(),
  type: z.nativeEnum(ContainerType),
});

export type TResetCardsProgressSchema = z.infer<
  typeof ZResetCardsProgressSchema
>;
