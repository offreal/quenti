import { Link } from "@quizfit/components";

import {
  Button,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { IconBrandGithub } from "@tabler/icons-react";

import { DefaultLayout } from "./default-layout";
import { PresentWrapper } from "./present-wrapper";

export const OnboardingSubscribe = () => {
  const cardBg = useColorModeValue("white", "gray.750");
  const muted = useColorModeValue("gray.600", "gray.400");

  return (
    <PresentWrapper>
      <DefaultLayout
        heading="Subscribe to updates"
        seoTitle="Subscribe to Updates"
        description="We're always adding new features and improvements. Want to stay in the loop?"
      >
        <Card
          bg={cardBg}
          shadow="lg"
          p="6"
          w={{ base: "full", md: "md" }}
          mx="4"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: "4", md: 0 }}
            flexDir={{
              base: "column",
              md: "row",
            }}
          >
            <Stack spacing="0">
              <Heading fontSize="md">Follow me on GitHub</Heading>
              <Text fontSize="sm" color={muted}>
                Updates, releases, and more.
              </Text>
            </Stack>
            <Button
              as={Link}
              href="https://github.com/offreal"
              leftIcon={<IconBrandGithub size={18} />}
              w={{ base: "full", md: "auto" }}
            >
              @offreal
            </Button>
          </Flex>
        </Card>
      </DefaultLayout>
    </PresentWrapper>
  );
};
