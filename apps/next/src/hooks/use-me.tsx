import { useSession } from "next-auth/react";

import { api } from "@quizfit/trpc";

export const useMe = () => {
  const { data: session } = useSession();

  return api.user.me.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!session?.user,
  });
};
