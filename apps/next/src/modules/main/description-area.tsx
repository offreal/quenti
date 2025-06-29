import { Link } from "@quizfit/components";
import { getProfileUrl } from "@quizfit/lib/profile-url";

import {
  Box,
  Flex,
  HStack,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";

import { IconDiscountCheck } from "@tabler/icons-react";

import { Avatar } from "../../components/avatar";
import { useSet } from "../../hooks/use-set";
import { ActionArea } from "./action-area";

export const DescriptionArea = () => {
  const { description, user } = useSet();
  const highlight = useColorModeValue("blue.500", "blue.200");

  return (
    <Stack spacing={8}>
      <Flex
        justifyContent={{ base: "start", sm: "space-between" }}
        flexDir={{ base: "column", sm: "row" }}
        gap={{ base: 8, sm: 0 }}
      >
        <HStack spacing={4}>
          <Avatar
            src={user.image}
            size="md"
            className="highlight-block"
            alt="User avatar"
          />
          <Stack spacing={0}>
            <HStack spacing="2">
              <Link
                fontWeight={700}
                href={getProfileUrl(user.username)}
                transition="color 0.2s ease-in-out"
                _hover={{ color: highlight }}
                className="highlight-block"
              >
                {user.username || ""}
              </Link>
              {user.verified && (
                <Box color="blue.300">
                  <Tooltip label="Verified">
                    <IconDiscountCheck size={20} aria-label="Verified" />
                  </Tooltip>
                </Box>
              )}
            </HStack>
            {user.name && (
              <Text fontSize="sm" color="gray.500" fontWeight={600}>
                {user.name}
              </Text>
            )}
          </Stack>
        </HStack>
        <ActionArea />
      </Flex>
      <Text whiteSpace="pre-wrap">{description}</Text>
    </Stack>
  );
};
