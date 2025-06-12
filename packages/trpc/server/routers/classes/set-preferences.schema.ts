import { z } from "zod";

import { BANNER_COLORS } from "@quizfit/lib/color";

export const ZSetPreferencesSchema = z.object({
  classId: z.string().cuid(),
  preferences: z.object({
    bannerColor: z
      .string()
      .refine((s) => BANNER_COLORS.includes(s))
      .nullable(),
  }),
});

export type TSetPreferencesSchema = z.infer<typeof ZSetPreferencesSchema>;
