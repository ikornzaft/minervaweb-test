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
                colorScheme="blue"
                rightIcon={<BiPlusCircle size="30px" />}
                borderLeftRadius="full"
                borderRightRadius="none"
                width="100%"
                paddingX="0"
                paddingY={6}
                paddingRight={6}
                size="sm"
                variant="ghost"
                id="right_button_1"
                onClick={menuHandler}
                justifyContent="flex-end"
                fontFamily="Poppins"
                fontWeight="400"
                color="gray.600"
                _hover={{ bgColor: 'blue.400', color: 'white' }}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_1}
              </Button>
              <Button
                colorScheme="blue"
                rightIcon={<BiPlusCircle size="30px" />}
                borderLeftRadius="full"
                borderRightRadius="none"
                width="100%"
                paddingX="0"
                paddingY={6}
                paddingRight={6}
                size="sm"
                variant="ghost"
                id="right_button_2"
                onClick={menuHandler}
                justifyContent="flex-end"
                fontFamily="Poppins"
                fontWeight="400"
                color="gray.600"
                _hover={{ bgColor: 'blue.400', color: 'white' }}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_2}
              </Button>
              <Button
                colorScheme="blue"
                rightIcon={<BiPlusCircle size="30px" />}
                borderLeftRadius="full"
                borderRightRadius="none"
                width="100%"
                paddingX="0"
                paddingY={6}
                paddingRight={6}
                size="sm"
                variant="ghost"
                id="right_button_3"
                onClick={menuHandler}
                justifyContent="flex-end"
                fontFamily="Poppins"
                fontWeight="400"
                color="gray.600"
                _hover={{ bgColor: 'blue.400', color: 'white' }}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_3}
              </Button>
              <Button
                colorScheme="blue"
                rightIcon={<BiPlusCircle size="30px" />}
                borderLeftRadius="full"
                borderRightRadius="none"
                width="100%"
                paddingX="0"
                paddingY={6}
                paddingRight={6}
                size="sm"
                variant="ghost"
                id="right_button_4"
                onClick={menuHandler}
                justifyContent="flex-end"
                fontFamily="Poppins"
                fontWeight="400"
                color="gray.600"
                _hover={{ bgColor: 'blue.400', color: 'white' }}
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
