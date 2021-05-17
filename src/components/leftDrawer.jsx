import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Button,
  Stack,
} from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';

const LeftDrawer = ({ placement, isOpen, onClose, finalFocus, setActiveButton }) => {
  const history = useHistory();
  const menuHandler = (e) => {
    onClose();
    setActiveButton(0);
    if (e.target.id === 'button_1') {
      history.push(`/actividades/matematicas`);
    }
    if (e.target.id === 'button_2') {
      history.push(`/actividades/comunicacion`);
    }
    if (e.target.id === 'button_3') {
      history.push(`/actividades/ciencias_naturales`);
    }
    if (e.target.id === 'button_4') {
      history.push(`/actividades/estudios_sociales`);
    }
  };
  return (
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
              id="button_1"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_1}
            </Button>
            <Button
              borderRadius="0"
              width="100%"
              paddingX="0"
              size="lg"
              variant="ghost"
              id="button_2"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_2}
            </Button>{' '}
            <Button
              borderRadius="0"
              width="100%"
              paddingX="0"
              size="lg"
              variant="ghost"
              id="button_3"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_3}
            </Button>
            <Button
              borderRadius="0"
              width="100%"
              paddingX="0"
              size="lg"
              variant="ghost"
              id="button_4"
              onClick={menuHandler}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_4}
            </Button>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { LeftDrawer };
