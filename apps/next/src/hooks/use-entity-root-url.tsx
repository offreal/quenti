import { useRouter } from "next/router";

import { getFolderUrl } from "@quizfit/lib/profile-url";

import { useSetFolderUnison } from "./use-set-folder-unison";

export const useEntityRootUrl = () => {
  const router = useRouter();
  const { id, entityType } = useSetFolderUnison();

  return entityType == "set"
    ? `/${id}`
    : getFolderUrl(
        router.query.username as string,
        router.query.slug as string,
      );
};
