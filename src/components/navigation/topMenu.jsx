import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Button, useDisclosure, Box } from '@chakra-ui/react';

import { LABELS } from '../../locals/sp/labels';

import { LeftDrawer } from './leftDrawer';
import { RightDrawer } from './rightDrawer';

const TopMenu = ({ isLoginOn, setLoginOn }) => {
  const history = useHistory();
  const { isOpen: isOpenLeft, onOpen: onOpenLeft, onClose: onCloseLeft } = useDisclosure();
  const { isOpen: isOpenRight, onOpen: onOpenRight, onClose: onCloseRight } = useDisclosure();
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
      history.push('/forum/');
    }
    if (e.target.id === 'menu-button_4') {
      setActiveButton(3);
      history.push('/quizzes/');
    }
    if (e.target.id === 'menu-button_5') {
      setActiveButton(4);
      history.push('/homeworks/');
    }
    if (e.target.id === 'menu-button_6') {
      setActiveButton(5);
      history.push('/exams/');
    }
  };
  const [activeButton, setActiveButton] = useState();

  useEffect(() => {
    localStorage.getItem('isStudent') === 'true' ? setActiveButton(0) : setActiveButton(1);
  }, []);

  return (
    <Stack
      alignItems="center"
      bgColor="white"
      borderBottomColor="gray.300"
      borderBottomWidth="1px"
      direction="row"
      justifyContent="space-between"
      paddingX={6}
      position={['absolute', 'fixed']}
      width="100vw"
      zIndex="100"
    >
      <Button ref={btnRef1} variant="primary" onClick={onOpenLeft}>
        {LABELS.TOP_MENU.MENU.LEFT_DRAWER.BUTTON_TEXT}
      </Button>
      <Stack direction={['column', 'row']}>
        {localStorage.getItem('isStudent') === 'true' ? (
          <Button
            id="menu-button_1"
            isActive={activeButton === 0 ? true : false}
            margin="0"
            variant="underlined"
            w="10rem"
            onClick={menuHandler}
          >
            {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_1}
          </Button>
        ) : null}
        <Button
          id="menu-button_2"
          isActive={activeButton === 1 ? true : false}
          margin="0"
          variant="underlined"
          w="10rem"
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_2}
        </Button>
        <Button
          id="menu-button_3"
          isActive={activeButton === 2 ? true : false}
          margin="0"
          variant="underlined"
          w="10rem"
          onClick={menuHandler}
        >
          {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_3}
        </Button>
        {localStorage.getItem('isStudent') === 'false' ? (
          <Button
            id="menu-button_4"
            isActive={activeButton === 3 ? true : false}
            margin="0"
            variant="underlined"
            w="10rem"
            onClick={menuHandler}
          >
            {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_4}
          </Button>
        ) : null}
        {localStorage.getItem('isStudent') === 'false' ? (
          <Button
            id="menu-button_5"
            isActive={activeButton === 4 ? true : false}
            margin="0"
            variant="underlined"
            w="10rem"
            onClick={menuHandler}
          >
            {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_5}
          </Button>
        ) : null}
        {localStorage.getItem('isStudent') === 'false' ? (
          <Button
            id="menu-button_6"
            isActive={activeButton === 5 ? true : false}
            margin="0"
            variant="underlined"
            w="10rem"
            onClick={menuHandler}
          >
            {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_6}
          </Button>
        ) : null}
      </Stack>

      {localStorage.getItem('isEditor') === 'true' ? (
        <Button ref={btnRef2} variant="primary" onClick={onOpenRight}>
          {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.BUTTON_TEXT}
        </Button>
      ) : (
        <Box w="8rem" />
      )}

      <LeftDrawer
        finalFocusRef={btnRef1}
        firstButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.CANCEL_BUTTON}
        inputPlaceholder={LABELS.TOP_MENU.MENU.LEFT_DRAWER.INPUT_PLACEHOLDER}
        isLoginOn={isLoginOn}
        isOpen={isOpenLeft}
        placement="left"
        secondButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.SAVE_BUTTON}
        setActiveButton={setActiveButton}
        setLoginOn={setLoginOn}
        title={LABELS.TOP_MENU.MENU.LEFT_DRAWER.TITLE}
        onClose={onCloseLeft}
      />
      <RightDrawer
        finalFocusRef={btnRef2}
        firstButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.CANCEL_BUTTON}
        inputPlaceholder={LABELS.TOP_MENU.MENU.LEFT_DRAWER.INPUT_PLACEHOLDER}
        isOpen={isOpenRight}
        placement="right"
        secondButton={LABELS.TOP_MENU.MENU.LEFT_DRAWER.SAVE_BUTTON}
        title={LABELS.TOP_MENU.MENU.LEFT_DRAWER.TITLE}
        onClose={onCloseRight}
      />
    </Stack>
  );
};

export { TopMenu };
