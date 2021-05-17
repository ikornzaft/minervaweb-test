import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Button, useDisclosure, ButtonGroup } from '@chakra-ui/react';
import { LeftDrawer } from './leftDrawer';
import { LABELS } from '../locals/sp/labels';

const TopMenu = () => {
  const history = useHistory();
  const {
    isOpen: isOpenLeft,
    onOpen: onOpenLeft,
    onClose: onCloseLeft,
  } = useDisclosure();
  const btnRef1 = React.useRef();
  const menuHandler = (e) => {
    if (e.target.id === 'menu-button_1') {
      setActiveButton(0);
      history.push('/actividades/');
    }
    if (e.target.id === 'menu-button_2') {
      setActiveButton(1);
      history.push('/consultas/');
    }
    if (e.target.id === 'menu-button_3') {
      setActiveButton(2);
      history.push('/compartidos/');
    }
    if (e.target.id === 'menu-button_4') {
      setActiveButton(3);
      history.push('/entregas/');
    }
  };
  const [activeButton, setActiveButton] = useState(0);
  return (
    <Flex
      backgroundColor="white"
      justifyContent="center"
      alignItems="center"
      boxShadow="md"
    >
      <Button
        position="absolute"
        left="0"
        marginLeft={4}
        ref={btnRef1}
        colorScheme="blue"
        size="sm"
        width="8rem"
        borderRadius="0"
        onClick={onOpenLeft}
      >
        {LABELS.TOP_MENU.MENU.LEFT_DRAWER.BUTTON_TEXT}
      </Button>

      <ButtonGroup size="sm" variant="outline" mr="4" p="2">
        <Button
          colorScheme="blue"
          borderRadius="0"
          width="8rem"
          id="menu-button_1"
          isActive={activeButton === 0 ? true : false}
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_1}
        </Button>
        <Button
          colorScheme="blue"
          borderRadius="0"
          width="8rem"
          id="menu-button_2"
          isActive={activeButton === 1 ? true : false}
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_2}
        </Button>
        <Button
          colorScheme="blue"
          borderRadius="0"
          width="8rem"
          id="menu-button_3"
          isActive={activeButton === 2 ? true : false}
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_3}
        </Button>
        <Button
          colorScheme="blue"
          borderRadius="0"
          width="8rem"
          id="menu-button_4"
          isActive={activeButton === 3 ? true : false}
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_4}
        </Button>
      </ButtonGroup>

      <LeftDrawer
        placement="left"
        isOpen={isOpenLeft}
        onClose={onCloseLeft}
        finalFocusRef={btnRef1}
        title={LABELS.TOP_MENU.MENU.LEFT_DRAWER.TITLE}
        inputPlaceholder={LABELS.TOP_MENU.MENU.LEFT_DRAWER.INPUT_PLACEHOLDER}
        firstButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.CANCEL_BUTTON}
        secondButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.SAVE_BUTTON}
        setActiveButton={setActiveButton}
      />
    </Flex>
  );
};

export { TopMenu };
