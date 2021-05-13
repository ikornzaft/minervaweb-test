import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Stack,
  Flex,
  Button,
  useDisclosure,
  ButtonGroup,
} from '@chakra-ui/react';
import { GenericDrawer } from './genericDrawer';
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
    if (e.target.id === 'actividadesBtn') {
      setActiveButton(0);
      history.push('/actividades/');
    }
    if (e.target.id === 'mixBtn') {
      setActiveButton(1);
      history.push('/form/');
    }
  };
  const [activeButton, setActiveButton] = useState(0);
  return (
    <Stack width="100%" position={['relative', 'fixed']}>
      <Flex
        backgroundColor="white"
        borderBottomWidth="1px"
        borderBottomColor="blue.500"
        justifyContent="center"
        alignItems="center"
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
            id="actividadesBtn"
            isActive={activeButton === 0 ? true : false}
            onClick={menuHandler}
          >
            {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_1}
          </Button>
          <Button
            colorScheme="blue"
            borderRadius="0"
            width="8rem"
            id="mixBtn"
            isActive={activeButton === 1 ? true : false}
            onClick={menuHandler}
          >
            {LABELS.TOP_MENU.MENU.BUTTONS.BUTTON_2}
          </Button>
        </ButtonGroup>

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
      </Flex>
    </Stack>
  );
};

export { TopMenu };
