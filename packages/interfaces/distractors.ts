import type { DistractorType } from "@quizfit/prisma/client";

import type { FacingTerm } from "./studiable-term";

export type Distractor = {
  type: DistractorType;
  termId: string;
  distractingId: string;
};

export type TermWithDistractors = FacingTerm & {
  distractors: Distractor[];
};
