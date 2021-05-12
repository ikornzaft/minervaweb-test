import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Stack,
  Flex,
  Box,
  Spacer,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { GenericDrawer } from './genericDrawer';
import { LABELS } from '../locals/sp/labels';

const TopMenu = () => {
  const history = useHistory();
  // Left drawer
  const {
    isOpen: isOpenLeft,
    onOpen: onOpenLeft,
    onClose: onCloseLeft,
  } = useDisclosure();
  const btnRef1 = React.useRef();
  // Right drawer
  const {
    isOpen: isOpenRight,
    onOpen: onOpenRight,
    onClose: onCloseRight,
  } = useDisclosure();
  const btnRef2 = React.useRef();
  const menuHandler = (e) => {
    if (e.target.id === 'feedBtn') history.push('/feed/');
    if (e.target.id === 'formBtn') history.push('/form/');
    if (e.target.id === 'mixBtn') history.push('/mix/');
    if (e.target.id === 'deTodoBtn') history.push('/detodo/');
  };
  return (
    <Stack alignSelf="center" width="100%">
      <Flex backgroundColor="gray.200">
        <Box p="2" paddingLeft="6">
          <Button ref={btnRef1} colorScheme="blue" onClick={onOpenLeft}>
            {LABELS.TOP_MENU.MENU.LEFT_DRAWER.BUTTON_TEXT}
          </Button>
        </Box>
        <Spacer />
        <Box p="2">
          <Button colorScheme="blue" mr="4" id="feedBtn" onClick={menuHandler}>
            Feed
          </Button>
          <Button colorScheme="blue" mr="4" id="formBtn" onClick={menuHandler}>
            Form Cualquiera
          </Button>
          <Button colorScheme="blue" mr="4" id="mixBtn" onClick={menuHandler}>
            Links y Botones
          </Button>
          <Button
            colorScheme="blue"
            mr="4"
            id="deTodoBtn"
            onClick={menuHandler}
          >
            De todo un poco
          </Button>
        </Box>
        <Spacer />
        <Box p="2" paddingRight="6">
          <Button ref={btnRef2} colorScheme="blue" onClick={onOpenRight}>
            {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.BUTTON_TEXT}
          </Button>
        </Box>

        <GenericDrawer
          placement="left"
          isOpen={isOpenLeft}
          onClose={onCloseLeft}
          finalFocusRef={btnRef1}
          title={LABELS.TOP_MENU.MENU.LEFT_DRAWER.TITLE}
          inputPlaceholder={LABELS.TOP_MENU.MENU.LEFT_DRAWER.INPUT_PLACEHOLDER}
          firstButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.CANCEL_BUTTON}
          secondButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.SAVE_BUTTON}
        />
        <GenericDrawer
          placement="right"
          isOpen={isOpenRight}
          onClose={onCloseRight}
          finalFocusRef={btnRef2}
          title={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.TITLE}
          inputPlaceholder={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.INPUT_PLACEHOLDER}
          firstButton={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.CANCEL_BUTTON}
          secondButton={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.SAVE_BUTTON}
        />
      </Flex>
    </Stack>
  );
};

export { TopMenu };