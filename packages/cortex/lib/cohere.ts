import cohere from "cohere-ai";

import { env } from "@quizfit/env/server";

if (env.COHERE_API_KEY) cohere.init(env.COHERE_API_KEY);

export { cohere };
