import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Button, useDisclosure } from '@chakra-ui/react';
import { LeftDrawer } from './leftDrawer';
import { RightDrawer } from './rightDrawer';
import { LABELS } from '../../locals/sp/labels';

const TopMenu = () => {
  const history = useHistory();
  const {
    isOpen: isOpenLeft,
    onOpen: onOpenLeft,
    onClose: onCloseLeft,
  } = useDisclosure();
  const {
    isOpen: isOpenRight,
    onOpen: onOpenRight,
    onClose: onCloseRight,
  } = useDisclosure();
  const btnRef1 = React.useRef();
  const btnRef2 = React.useRef();
  const menuHandler = (e) => {
    if (e.target.id === 'menu-button_1') {
      setActiveButton(0);
      history.push('/activities/');
    }
    if (e.target.id === 'menu-button_2') {
      setActiveButton(1);
      history.push('/requests-board/');
    }
    if (e.target.id === 'menu-button_3') {
      setActiveButton(2);
      history.push('/tasks/');
    }
    if (e.target.id === 'menu-button_4') {
      setActiveButton(3);
      history.push('/exams/');
    }
    if (e.target.id === 'menu-button_5') {
      setActiveButton(4);
      history.push('/feed/');
    }
  };
  const [activeButton, setActiveButton] = useState(0);
  return (
    <Stack
      width="100vw"
      position={['absolute', 'fixed']}
      bgColor="white"
      borderBottomWidth="1px"
      borderBottomColor="gray.300"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      paddingX={6}
      zIndex="100"
    >
      <Button ref={btnRef1} variant="primary" onClick={onOpenLeft}>
        {LABELS.TOP_MENU.MENU.LEFT_DRAWER.BUTTON_TEXT}
      </Button>
      <Stack direction={['column', 'row']}>
        <Button
          variant="underlined"
          id="menu-button_1"
          isActive={activeButton === 0 ? true : false}
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_1}
        </Button>
        <Button
          variant="underlined"
          id="menu-button_2"
          isActive={activeButton === 1 ? true : false}
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_2}
        </Button>
        <Button
          variant="underlined"
          id="menu-button_3"
          isActive={activeButton === 2 ? true : false}
          onClick={menuHandler}
          disabled={true}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_3}
        </Button>
        <Button
          variant="underlined"
          id="menu-button_4"
          isActive={activeButton === 3 ? true : false}
          onClick={menuHandler}
          disabled={true}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_4}
        </Button>
        <Button
          variant="underlined"
          id="menu-button_4"
          isActive={activeButton === 3 ? true : false}
          onClick={menuHandler}
          disabled={true}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_5}
        </Button>
      </Stack>

      <Button ref={btnRef2} variant="primary" onClick={onOpenRight}>
        {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.BUTTON_TEXT}
      </Button>

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
      <RightDrawer
        placement="right"
        isOpen={isOpenRight}
        onClose={onCloseRight}
        finalFocusRef={btnRef2}
        title={LABELS.TOP_MENU.MENU.LEFT_DRAWER.TITLE}
        inputPlaceholder={LABELS.TOP_MENU.MENU.LEFT_DRAWER.INPUT_PLACEHOLDER}
        firstButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.CANCEL_BUTTON}
        secondButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.SAVE_BUTTON}
      />
    </Stack>
  );
};

export { TopMenu };
