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
import { BiPlusCircle } from 'react-icons/bi';

import { ArticleForm } from '../createArticle/articleForm';
import { ExamForm } from '../createExam/examForm';
import { QuizForm } from '../createQuiz/quizForm';
import { HomeworkForm } from '../createHomework/homeworkForm';
import { LABELS } from '../../locals/sp/labels';

const RightDrawer = ({ placement, isOpen, onClose, finalFocus }) => {
  const {
    isOpen: isOpenNewActivity,
    onOpen: onOpenNewActivity,
    onClose: onCloseNewActivity,
  } = useDisclosure();
  const {
    isOpen: isOpenNewHomework,
    onOpen: onOpenNewHomework,
    onClose: onCloseNewHomework,
  } = useDisclosure();
  const { isOpen: isOpenNewExam, onOpen: onOpenNewExam, onClose: onCloseNewExam } = useDisclosure();
  const { isOpen: isOpenNewQuiz, onOpen: onOpenNewQuiz, onClose: onCloseNewQuiz } = useDisclosure();
  const menuHandlerActivity = (e) => {
    onClose();
    onOpenNewActivity();
  };
  const menuHandlerHomework = (e) => {
    onClose();
    onOpenNewHomework();
  };
  const menuHandlerExam = (e) => {
    onClose();
    onOpenNewExam();
  };
  const menuHandlerQuiz = (e) => {
    onClose();
    onOpenNewQuiz();
  };

  return (
    <>
      <Drawer finalFocusRef={finalFocus} isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody paddingX="0">
            <Stack direction="column" paddingLeft={4} paddingTop={8} width="100%">
              <Button
                id="right_button_1"
                rightIcon={<BiPlusCircle size="30px" />}
                variant="drawerRight"
                onClick={menuHandlerActivity}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_1}
              </Button>
              <Button
                id="right_button_2"
                rightIcon={<BiPlusCircle size="30px" />}
                variant="drawerRight"
                onClick={menuHandlerHomework}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_2}
              </Button>
              <Button
                id="right_button_3"
                rightIcon={<BiPlusCircle size="30px" />}
                variant="drawerRight"
                onClick={menuHandlerExam}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_3}
              </Button>
              <Button
                id="right_button_4"
                rightIcon={<BiPlusCircle size="30px" />}
                variant="drawerRight"
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
        modalTitle={LABELS.TOP_MENU.MENU.RIGHT_DRAWER.NEW_ACTIVITY_MODAL.TITLE}
        onClose={onCloseNewActivity}
      />
      <HomeworkForm
        isOpen={isOpenNewHomework}
        modalTitle="Nueva tarea"
        onClose={onCloseNewHomework}
      />
      <ExamForm isOpen={isOpenNewExam} modalTitle="Nuevo examen" onClose={onCloseNewExam} />
      <QuizForm isOpen={isOpenNewQuiz} modalTitle="Nueva autoevaluación" onClose={onCloseNewQuiz} />
    </>
  );
};

export { RightDrawer };
