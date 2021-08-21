import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
} from '@chakra-ui/react';

import { QuizzesSelector } from '../createArticle/sections/quizzesSelector';
import { AREAS } from '../../locals/sp/areas';

const TodoInputModal = ({
  isOpen,
  onClose,
  draftToDo,
  setDraftToDo,
  selectedHomeworks,
  setSelectedHomeworks,
  selectedQuizzes,
  setSelectedQuizzes,
  selectedExams,
  setSelectedExams,
}) => {
  const [selectorOptions, setSelectorOptions] = useState([]);
  const [section1, setSection1] = useState(null);
  const [section2, setSection2] = useState(null);

  const [workAreas, setWorkAreas] = useState([
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ]);

  useEffect(() => {
    const quizzes = draftToDo.filter((el) => el.content.type === 'quiz');
    const exams = draftToDo.filter((el) => el.content.type === 'exam');
    const homeworks = draftToDo.filter((el) => el.content.type === 'homework');

    setSelectedQuizzes(quizzes);
    setSelectedExams(exams);
    setSelectedHomeworks(homeworks);
  }, [draftToDo, setSelectedQuizzes, setSelectedExams, setSelectedHomeworks]);

  const submitTodoSection = () => {
    setDraftToDo(selectedQuizzes.concat(selectedExams, selectedHomeworks));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
          paddingBottom={2}
        >
          Modificar &quot;Para Hacer&quot;
        </ModalHeader>
        <ModalBody textAlign="center">
          <QuizzesSelector
            selectedQuizzes={selectedQuizzes}
            setSelectedQuizzes={setSelectedQuizzes}
            workAreas={workAreas}
          />
        </ModalBody>

        <ModalFooter>
          <Flex justifyContent="center" paddingBottom={2} paddingX={4} w="100%">
            <Button
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
              mt={4}
              onClick={submitTodoSection}
            >
              Confirmar contenido
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { TodoInputModal };
