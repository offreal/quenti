import { env as clientEnv } from "@quizfit/env/client";
import { env as serverEnv } from "@quizfit/env/server";

export const IS_PAYMENT_ENABLED = !!(
  serverEnv.STRIPE_PRIVATE_KEY && clientEnv.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
);
