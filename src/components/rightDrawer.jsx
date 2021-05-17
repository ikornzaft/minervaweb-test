import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Button,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import { GenericModal } from './genericModal';
import { GenericForm } from './genericForm';
import { LABELS } from '../locals/sp/labels';

const RightDrawer = ({ placement, isOpen, onClose, finalFocus }) => {
  const {
    isOpen: isOpenNewActivity,
    onOpen: onOpenNewActivity,
    onClose: onCloseNewActivity,
  } = useDisclosure();
  const menuHandler = (e) => {
    onClose();
    onOpenNewActivity();
  };
  return (
    <>
    <Drawer
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
      finalFocusRef={finalFocus}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody paddingX="0">
          <Stack width="100%" direction="column" paddingTop={12}>
            <Button
              borderRadius="0"
              width="100%"
              paddingX="0"
              size="lg"
              variant="ghost"
              id="right_button_1"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_1}
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
    <GenericModal
    isOpen={isOpenNewActivity}
    onClose={onCloseNewActivity}
    modalTitle={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.NEW_ACTIVITY_MODAL.TITLE}
    modalContent={<GenericForm firstFieldLabel={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.NEW_ACTIVITY_MODAL.FORM_INPUT_1} firstFieldType='text' firstFieldId='nombre_actividad' buttonText={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.NEW_ACTIVITY_MODAL.FORM_BUTTON}  />}
  />
  </>
  );
};

export { RightDrawer };
