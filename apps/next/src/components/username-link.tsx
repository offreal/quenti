import { Link } from "@quizfit/components";
import { getProfileUrl } from "@quizfit/lib/profile-url";

import { useColorModeValue } from "@chakra-ui/react";

export const UsernameLink: React.FC<
  Omit<React.ComponentProps<typeof Link>, "href"> & { username: string | null }
> = (props) => {
  const highlight = useColorModeValue("blue.500", "blue.200");

  return (
    <Link
      fontWeight={700}
      transition="color 0.2s ease-in-out"
      _hover={{ color: highlight }}
      className="highlight-block"
      href={getProfileUrl(props.username)}
      {...props}
    >
      {props.username}
    </Link>
  );
};
