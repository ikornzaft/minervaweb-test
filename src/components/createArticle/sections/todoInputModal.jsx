import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Button,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Stack,
  Tooltip,
  Select,
} from '@chakra-ui/react';

import { HomeworksSelector } from './homeworksSelector';
import { QuizzesSelector } from './quizzesSelector';
import { ExamsSelector } from './examsSelector';

const TodoInputModal = ({
  isOpen,
  onClose,
  sectionsList,
  setSectionsList,
  selectedExams,
  setSelectedExams,
  selectedQuizzes,
  setSelectedQuizzes,
  selectedHomeworks,
  setSelectedHomeworks,
  workAreas,
}) => {
  const [selectorOptions, setSelectorOptions] = useState([]);
  const [section1, setSection1] = useState(null);
  const [section2, setSection2] = useState(null);

  const [s1, s2] = [...sectionsList];

  useEffect((s1, s2) => {
    setSection1(s1);
    setSection2(s2);
  }, []);

  useEffect(() => {
    setSectionsList([section1, section2]);
  }, [section1, section2]);

  const submitTodoSection = () => {
    setSection2({
      ...section2,
      contents: [...selectedQuizzes, ...selectedExams, ...selectedHomeworks],
    });
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
          Agregar a Secciones
        </ModalHeader>
        <ModalBody textAlign="center">
          <Tabs>
            <TabList justifyContent="center">
              <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                Tareas
              </Tab>
              <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                Autoevaluaciones
              </Tab>
              <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                Pruebas
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <HomeworksSelector
                  selectedHomeworks={selectedHomeworks}
                  setSelectedHomeworks={setSelectedHomeworks}
                  workAreas={workAreas}
                />
              </TabPanel>

              <TabPanel>
                <QuizzesSelector
                  selectedQuizzes={selectedQuizzes}
                  setSelectedQuizzes={setSelectedQuizzes}
                  workAreas={workAreas}
                />
              </TabPanel>

              <TabPanel>
                <ExamsSelector
                  selectedExams={selectedExams}
                  setSelectedExams={setSelectedExams}
                  workAreas={workAreas}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalCloseButton />
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
