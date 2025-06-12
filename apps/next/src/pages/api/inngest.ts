import { functions, inngest } from "@quizfit/inngest";
import { serve } from "@quizfit/inngest/next";

export default serve({ client: inngest, functions });
