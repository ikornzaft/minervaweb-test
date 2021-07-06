import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  Stack,
  HStack,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { AiOutlineCalculator } from 'react-icons/ai';
import { FiPenTool } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import { BiWorld } from 'react-icons/bi';
import { ImLab } from 'react-icons/im';
import { LABELS } from '../../locals/sp/labels';

const LeftDrawer = ({
  placement,
  isOpen,
  onClose,
  finalFocus,
  setActiveButton,
}) => {
  const history = useHistory();
  const menuHandler = (e) => {
    onClose();
    setActiveButton(0);
    if (e.target.id === 'button_1') {
      history.push(`/articles/mate`);
    }
    if (e.target.id === 'button_2') {
      history.push(`/articles/comunicacion`);
    }
    if (e.target.id === 'button_3') {
      history.push(`/articles/naturales`);
    }
    if (e.target.id === 'button_4') {
      history.push(`/articles/sociales`);
    }
    if (e.target.id === 'button_5') {
      history.push(`/articles/research`);
    }
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
      finalFocusRef={finalFocus}
      size="xs"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody paddingX="0">
          <Stack
            width="100%"
            direction="column"
            paddingTop={4}
            paddingRight={4}
          >
            <HStack justifyContent="center">
              <Heading
                as="h2"
                marginBottom={2}
                fontSize="lg"
                fontWeight="400"
                fontFamily="Poppins"
                color="gray.600"
              >
                Materias
              </Heading>
            </HStack>
            <Divider />
            <Button
              variant="drawerLeft"
              leftIcon={<AiOutlineCalculator size="30px" />}
              id="button_1"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_1}
            </Button>
            <Button
              variant="drawerLeft"
              leftIcon={<FiPenTool size="30px" />}
              id="button_2"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_2}
            </Button>{' '}
            <Button
              variant="drawerLeft"
              leftIcon={<RiLeafLine size="30px" />}
              id="button_3"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_3}
            </Button>
            <Button
              variant="drawerLeft"
              leftIcon={<BiWorld size="30px" />}
              id="button_4"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_4}
            </Button>
            {localStorage.getItem('isResearcher') === 'true' ? <Button
              variant="drawerLeft"
              leftIcon={<ImLab size="30px" />}
              id="button_5"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_5}
            </Button> : null}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { LeftDrawer };
