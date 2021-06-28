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
import { QuizForm } from '../createQuiz/quizForm';
import { BiPlusCircle } from 'react-icons/bi';
import { LABELS } from '../../locals/sp/labels';

const RightDrawer = ({ placement, isOpen, onClose, finalFocus }) => {
  const {
    isOpen: isOpenNewActivity,
    onOpen: onOpenNewActivity,
    onClose: onCloseNewActivity,
  } = useDisclosure();
  const {
    isOpen: isOpenNewQuiz,
    onOpen: onOpenNewQuiz,
    onClose: onCloseNewQuiz,
  } = useDisclosure();
  const menuHandlerActivity = (e) => {
    onClose();
    onOpenNewActivity();
  };
  const menuHandlerQuiz = (e) => {
    onClose();
    onOpenNewQuiz();
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
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_1"
                onClick={menuHandlerActivity}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_1}
              </Button>
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_2"
                onClick={menuHandlerActivity}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_2}
              </Button>
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_3"
                onClick={menuHandlerActivity}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_3}
              </Button>
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_4"
                onClick={menuHandlerQuiz}
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
      <QuizForm
        isOpen={isOpenNewQuiz}
        onClose={onCloseNewQuiz}
        modalTitle="Nueva autoevaluación"
      />
    </>
  );
};

export { RightDrawer };
