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
  VStack,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { AiOutlineCalculator } from 'react-icons/ai';
import { FiPenTool } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';
import { BiWorld } from 'react-icons/bi';
import { ImLab } from 'react-icons/im';
import { IoMdExit } from 'react-icons/io';

import { LABELS } from '../../locals/sp/labels';

const LeftDrawer = ({
  placement,
  isOpen,
  onClose,
  finalFocus,
  setActiveButton,
  isLoginOn,
  setLoginOn,
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
  const logoutHandler = () => {
    localStorage.setItem('credentials', '');
    localStorage.setItem('userWorkgroups', '');
    localStorage.setItem('userName', '');
    localStorage.setItem('isStudent', '');
    localStorage.setItem('isEditor', '');
    localStorage.setItem('isResearcher', '');
    localStorage.setItem('realName', '');
    history.push('/login/');
    setLoginOn(!isLoginOn);
    onClose();
  };

  return (
    <Drawer
      finalFocusRef={finalFocus}
      isOpen={isOpen}
      placement={placement}
      size="xs"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody paddingX="0">
          <VStack h="97vh" justifyContent="space-between">
            <Stack direction="column" paddingRight={4} paddingTop={4} width="100%">
              <HStack justifyContent="center">
                <Heading
                  as="h2"
                  color="gray.600"
                  fontFamily="Poppins"
                  fontSize="lg"
                  fontWeight="400"
                  marginBottom={2}
                >
                  Materias
                </Heading>
              </HStack>
              <Divider />
              <Button
                id="button_1"
                leftIcon={<AiOutlineCalculator size="30px" />}
                variant="drawerLeft"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_1}
              </Button>
              <Button
                id="button_2"
                leftIcon={<FiPenTool size="30px" />}
                variant="drawerLeft"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_2}
              </Button>{' '}
              <Button
                id="button_3"
                leftIcon={<RiLeafLine size="30px" />}
                variant="drawerLeft"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_3}
              </Button>
              <Button
                id="button_4"
                leftIcon={<BiWorld size="30px" />}
                variant="drawerLeft"
                onClick={menuHandler}
              >
                {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_4}
              </Button>
              {localStorage.getItem('isResearcher') === 'true' ? (
                <Button
                  id="button_5"
                  leftIcon={<ImLab size="30px" />}
                  variant="drawerLeft"
                  onClick={menuHandler}
                >
                  {LABELS.TOP_MENU.MENU.LEFT_DRAWER.MATERIAS.BUTTON_5}
                </Button>
              ) : null}
            </Stack>
            <Stack alignItems="flex-end" w="100%">
              <Divider />
              <Button
                id="button_4"
                rightIcon={<IoMdExit size="30px" />}
                variant="drawerRight"
                w="11rem"
                onClick={logoutHandler}
              >
                Cerrar sesión
              </Button>
            </Stack>
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { LeftDrawer };
