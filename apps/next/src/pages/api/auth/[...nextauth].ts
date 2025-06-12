import type { NextApiHandler } from "next";
import NextAuth from "next-auth";

import { authOptions } from "@quizfit/auth/next-auth-options";

export default NextAuth(authOptions) as NextApiHandler;
