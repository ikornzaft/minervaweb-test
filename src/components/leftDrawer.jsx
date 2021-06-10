import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Button,
  Stack,
} from '@chakra-ui/react';
import { AiOutlineCalculator } from 'react-icons/ai';
import { FiPenTool } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import { BiWorld } from 'react-icons/bi';
import { LABELS } from '../locals/sp/labels';

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
      size="xs"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody paddingX="0">
          <Stack
            width="100%"
            direction="column"
            paddingTop={8}
            paddingRight={2}
          >
            <Button
              colorScheme="blue"
              leftIcon={<AiOutlineCalculator size="30px" />}
              borderRightRadius="full"
              borderLeftRadius="none"
              width="100%"
              paddingX="0"
              paddingY={6}
              size="sm"
              variant="ghost"
              id="button_1"
              onClick={menuHandler}
              justifyContent="flex-start"
              paddingLeft={8}
              fontFamily="Poppins"
              fontWeight="400"
              color="gray.600"
              _hover={{ bgColor: 'blue.400', color: 'white' }}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_1}
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<FiPenTool size="30px" />}
              borderRightRadius="full"
              borderLeftRadius="none"
              width="100%"
              paddingX="0"
              paddingY={6}
              variant="ghost"
              size="sm"
              id="button_2"
              onClick={menuHandler}
              justifyContent="flex-start"
              paddingLeft={8}
              fontFamily="Poppins"
              fontWeight="400"
              color="gray.600"
              _hover={{ bgColor: 'blue.400', color: 'white' }}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_2}
            </Button>{' '}
            <Button
              leftIcon={<RiLeafLine size="30px" />}
              v
              borderRightRadius="full"
              borderLeftRadius="none"
              width="100%"
              paddingX="0"
              paddingY={6}
              variant="ghost"
              size="sm"
              id="button_3"
              onClick={menuHandler}
              justifyContent="flex-start"
              paddingLeft={8}
              fontFamily="Poppins"
              fontWeight="400"
              color="gray.600"
              _hover={{ bgColor: 'blue.400', color: 'white' }}
            >
              {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_3}
            </Button>
            <Button
              leftIcon={<BiWorld size="30px" />}
              colorScheme="blue"
              borderRightRadius="full"
              borderLeftRadius="none"
              width="100%"
              paddingX="0"
              paddingY={6}
              variant="ghost"
              size="sm"
              id="button_4"
              onClick={menuHandler}
              justifyContent="flex-start"
              paddingLeft={8}
              fontFamily="Poppins"
              fontWeight="400"
              color="gray.600"
              _hover={{ bgColor: 'blue.400', color: 'white' }}
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
