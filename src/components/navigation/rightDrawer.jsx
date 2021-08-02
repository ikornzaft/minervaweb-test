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
import { ExamForm } from '../createExam/examForm';
import { QuizForm } from '../createQuiz/quizForm';
import { HomeworkForm } from '../createHomework/homeworkForm';
import { BiPlusCircle } from 'react-icons/bi';
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
  const {
    isOpen: isOpenNewExam,
    onOpen: onOpenNewExam,
    onClose: onCloseNewExam,
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
                onClick={menuHandlerHomework}
              >
                {LABELS.TOP_MENU.MENU.RIGHT_DRAWER.OPCIONES.BUTTON_2}
              </Button>
              <Button
                variant="drawerRight"
                rightIcon={<BiPlusCircle size="30px" />}
                id="right_button_3"
                onClick={menuHandlerExam}
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
      <HomeworkForm
      isOpen={isOpenNewHomework}
      onClose={onCloseNewHomework}
      modalTitle="Nueva tarea"
    />
      <ExamForm
        isOpen={isOpenNewExam}
        onClose={onCloseNewExam}
        modalTitle="Nuevo examen"
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
