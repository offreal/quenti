import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";

import { Link } from "@quizfit/components";
import { avatarUrl } from "@quizfit/lib/avatar";
import { EnabledFeature } from "@quizfit/lib/feature";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import { IconMenu, IconX } from "@tabler/icons-react";

import { menuEventChannel } from "../events/menu";
import { useFeature } from "../hooks/use-feature";
import LeftNav from "./navbar/left-nav";
import MobileMenu from "./navbar/mobile-menu";
import UserMenu from "./navbar/user-menu";

const CreateFolderModal = dynamic(() => import("./create-folder-modal"), {
  ssr: false,
});

export const Navbar: React.FC = () => {
  const router = useRouter();

  const { data: session, status } = useSession();
  const { isOpen: isMobileMenuOpen, onToggle: onMobileMenuToggle } =
    useDisclosure();
  const user = session?.user;
  const earlyClassAccess = useFeature(EnabledFeature.EarlyClassAccess);

  const [folderModalOpen, setFolderModalOpen] = React.useState(false);
  const [folderChildSetId, setFolderChildSetId] = React.useState<string>();

  React.useEffect(() => {
    const createFolder = (setId?: string) => {
      setFolderChildSetId(setId);
      setFolderModalOpen(true);
    };
    const createClass = () => {
      onClassClick();
    };

    menuEventChannel.on("createFolder", createFolder);
    menuEventChannel.on("createClass", createClass);
    return () => {
      menuEventChannel.off("createFolder", createFolder);
      menuEventChannel.off("createClass", createClass);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClassClick = () => {
    if (user?.organizationId || earlyClassAccess)
      void router.push("/classes/new");
    else menuEventChannel.emit("openCreateClassNotice");
  };

  return (
    <>
      <CreateFolderModal
        isOpen={folderModalOpen}
        onClose={() => {
          setFolderModalOpen(false);
          setFolderChildSetId(undefined);
        }}
        childSetId={folderChildSetId}
      />
      <Flex pos="relative" zIndex={1000} w="full" h="20">
        <HStack
          as="header"
          aria-label="Main navigation"
          w="full"
          mx="auto"
          px={{ base: "6", md: "8" }}
          py="4"
          justify="space-between"
        >
          <LeftNav
            onFolderClick={() => setFolderModalOpen(true)}
            onClassClick={onClassClick}
          />
          <Box display={["block", "block", "none"]}>
            <HStack>
              {user && (
                <Avatar
                  src={avatarUrl({
                    ...user,
                    image: user.image!,
                  })}
                  size="sm"
                  className="highlight-block"
                >
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
              )}
              <IconButton
                aria-label={"Open menu"}
                icon={
                  isMobileMenuOpen ? (
                    <IconX size={20} />
                  ) : (
                    <IconMenu size={20} />
                  )
                }
                variant="ghost"
                colorScheme="gray"
                onClick={onMobileMenuToggle}
              />
            </HStack>
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={onMobileMenuToggle}
              onFolderClick={() => setFolderModalOpen(true)}
              onClassClick={onClassClick}
            />
          </Box>
          <HStack as="nav" display={["none", "none", "flex"]} height="12">
            {session?.user && <UserMenu />}
            {status !== "loading" && !session && (
              <ButtonGroup spacing="2">
                <Button
                  fontWeight={600}
                  rounded="xl"
                  as={Link}
                  href="/auth/login"
                  variant="outline"
                  colorScheme="gray"
                  fontSize="sm"
                >
                  Log in
                </Button>
                <Button
                  fontWeight={600}
                  rounded="xl"
                  _light={{
                    bg: "black",
                    color: "white",
                    _hover: {
                      bg: "gray.800",
                    },
                  }}
                  as={Link}
                  fontSize="sm"
                  href="/auth/signup"
                >
                  Sign up for free
                </Button>
              </ButtonGroup>
            )}
          </HStack>
        </HStack>
      </Flex>
    </>
  );
};

export default Navbar;
