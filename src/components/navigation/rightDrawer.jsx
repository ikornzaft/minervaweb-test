import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { ArticleForm } from '../createArticle/articleForm';
import { BiPlusCircle } from 'react-icons/bi';
import { LABELS } from '../../locals/sp/labels';

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
          <DrawerBody paddingX="0">
            <Stack
              width="100%"
              direction="column"
              paddingTop={8}
              paddingLeft={4}
            >
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_1"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_1}
              </Button>
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_2"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_2}
              </Button>
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_3"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_3}
              </Button>
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_4"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_4}
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <ArticleForm
        isOpen={isOpenNewActivity}
        onClose={onCloseNewActivity}
        modalTitle={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.NEW_ACTIVITY_MODAL.TITLE}
      />
    </>
  );
};

export { RightDrawer };
