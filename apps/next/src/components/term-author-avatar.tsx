import type { FacingTerm } from "@quizfit/interfaces";

import { Popover, PopoverTrigger } from "@chakra-ui/react";

import { CollaboratorPopoverContent } from "../modules/main/collaborator-popover-content";
import { Avatar } from "./avatar";

export interface TermAuthorAvatarProps {
  user: NonNullable<FacingTerm["author"]>;
  computePosition?: boolean;
}

export const TermAuthorAvatar: React.FC<TermAuthorAvatarProps> = ({
  user,
  computePosition,
}) => {
  return (
    <Popover
      isLazy
      trigger="hover"
      placement="top"
      computePositionOnMount={computePosition}
    >
      <PopoverTrigger>
        <Avatar
          bg="gray.200"
          _dark={{
            bg: "gray.700",
          }}
          style={{
            minWidth: 24,
            width: 24,
            height: 24,
            overflow: "hidden",
          }}
          src={user.image}
          size="xs"
          imageWidth={24}
          imageHeight={24}
          alt="User avatar"
        />
      </PopoverTrigger>
      <CollaboratorPopoverContent type="collaborator" user={user} />
    </Popover>
  );
};
