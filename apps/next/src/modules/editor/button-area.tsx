import React from "react";

import { api } from "@quizfit/trpc";

import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Menu,
  Skeleton,
  Tooltip,
} from "@chakra-ui/react";

import {
  IconChevronDown,
  IconKeyboard,
  IconKeyframes,
  IconPlus,
  IconSwitchHorizontal,
} from "@tabler/icons-react";

import { visibilityIcon } from "../../common/visibility-icon";
import {
  SetEditorStoreContext,
  useSetEditorContext,
} from "../../stores/use-set-editor-store";
import { ShortcutModal } from "./shortcut-modal";
import { VisibilityModal } from "./visibility-modal";

export interface ButtonAreaProps {
  onImportOpen: () => void;
}

export const ButtonArea = ({ onImportOpen }: ButtonAreaProps) => {
  const store = React.useContext(SetEditorStoreContext)!;
  const id = useSetEditorContext((s) => s.id);
  const visibility = useSetEditorContext((s) => s.visibility);
  const setVisibility = useSetEditorContext((s) => s.setVisibility);
  const classesWithAccess = useSetEditorContext((s) => s.classesWithAccess);
  const setClassesWithAccess = useSetEditorContext(
    (s) => s.setClassesWithAccess,
  );
  const flipTerms = useSetEditorContext((s) => s.flipTerms);

  const [visibilityModalOpen, setVisibilityModalOpen] = React.useState(false);
  const [shortcutModalOpen, setShortcutModalOpen] = React.useState(false);

  api.studySets.getAllowedClasses.useQuery(
    {
      studySetId: id,
    },
    {
      enabled: visibility == "Class",
      onSuccess: (data) => {
        store.getState().classesWithAccess = data?.classes || [];
      },
    },
  );

  return (
    <>
      <VisibilityModal
        isOpen={visibilityModalOpen}
        visibility={visibility}
        classesWithAccess={classesWithAccess}
        onChangeClassesWithAccess={setClassesWithAccess}
        onChangeVisibility={(v) => {
          setVisibility(v);
          if (v !== "Class") setVisibilityModalOpen(false);
        }}
        onClose={() => {
          setVisibilityModalOpen(false);
        }}
      />
      <ShortcutModal
        isOpen={shortcutModalOpen}
        onClose={() => setShortcutModalOpen(false)}
      />
      <HStack
        justifyContent="space-between"
        spacing="6"
        alignItems={{
          base: "start",
          md: "center",
        }}
        flexDir={{
          base: "column",
          md: "row",
        }}
      >
        <HStack
          alignItems={{
            base: "start",
            sm: "center",
          }}
          flexDir={{
            base: "column",
            sm: "row",
          }}
        >
          <Button
            leftIcon={<IconKeyframes size={18} />}
            variant="outline"
            onClick={onImportOpen}
            colorScheme="gray"
          >
            Import terms
          </Button>
        </HStack>
        <ButtonGroup
          w={{ base: "full", md: "auto" }}
          justifyContent={{
            base: "space-between",
            md: "auto",
          }}
        >
          <Button
            leftIcon={visibilityIcon(visibility)}
            rightIcon={<IconChevronDown />}
            variant="ghost"
            onClick={() => {
              setVisibilityModalOpen(true);
            }}
          >
            {visibility}
          </Button>
          <ButtonGroup spacing={4}>
            <Tooltip label="Flip terms and definitions">
              <IconButton
                icon={<IconSwitchHorizontal />}
                rounded="full"
                aria-label="Flip terms and definitions"
                onClick={flipTerms}
              />
            </Tooltip>
            <Menu placement="bottom-end">
              <Tooltip label="Show keyboard shortcuts">
                <IconButton
                  icon={<IconKeyboard />}
                  rounded="full"
                  aria-label="Show keyboard shortcuts"
                  onClick={() => setShortcutModalOpen(true)}
                />
              </Tooltip>
            </Menu>
          </ButtonGroup>
        </ButtonGroup>
      </HStack>
    </>
  );
};

export interface ButtonAreaSkeletonProps {}

ButtonArea.Skeleton = function ButtonAreaSkeleton({}: ButtonAreaSkeletonProps) {
  return (
    <HStack
      justifyContent="space-between"
      spacing="6"
      alignItems={{
        base: "start",
        md: "center",
      }}
      flexDir={{
        base: "column",
        md: "row",
      }}
    >
      <HStack
        alignItems={{
          base: "start",
          sm: "center",
        }}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Skeleton fitContent rounded="lg">
          <Button leftIcon={<IconPlus size={18} />} variant="outline">
            Import terms
          </Button>
        </Skeleton>
      </HStack>
      <ButtonGroup
        w={{ base: "full", md: "auto" }}
        justifyContent={{
          base: "end",
          md: "auto",
        }}
      >
        <ButtonGroup spacing={4}>
          <Skeleton rounded="full">
            <IconButton
              icon={<IconSwitchHorizontal />}
              rounded="full"
              aria-label="Flip terms and definitions"
            />
          </Skeleton>
          <Skeleton rounded="full">
            <IconButton
              icon={<IconKeyboard />}
              rounded="full"
              aria-label="Show keyboard shortcuts"
            />
          </Skeleton>
        </ButtonGroup>
      </ButtonGroup>
    </HStack>
  );
};
