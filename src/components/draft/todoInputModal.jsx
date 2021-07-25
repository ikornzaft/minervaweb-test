import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import { HomeworksSelector } from '../createArticle/sections/homeworksSelector';
import { QuizzesSelector } from '../createArticle/sections/quizzesSelector';
import { AREAS } from '../../locals/sp/areas';
import { RiContactsBookLine } from 'react-icons/ri';

const TodoInputModal = ({
  isOpen,
  onClose,
  draftToDo,
  setDraftToDo,
  selectedHomeworks, 
  setSelectedHomeworks,
  selectedQuizzes, 
  setSelectedQuizzes,
}) => {

  const [selectorOptions, setSelectorOptions] = useState([]);
  const [section1, setSection1] = useState(null)
  const [section2, setSection2] = useState(null)

  const [workAreas, setWorkAreas] = useState([
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ])
  
  useEffect(() => {
    const quizzes = draftToDo.filter(el => el.content.type === 'quiz')
    setSelectedQuizzes(quizzes)

  }, [draftToDo])

  const submitTodoSection = () => {
    setDraftToDo(selectedQuizzes);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          alignSelf="center"
          paddingBottom={2}
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          Modificar "Para Hacer"
        </ModalHeader>
        <ModalBody textAlign="center">
          <Tabs>
            <TabList justifyContent="center">
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
              >
                Tareas
              </Tab>
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
              >
                Autoevaluaciones
              </Tab>
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
              >
                Pruebas
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <HomeworksSelector
                  workAreas={workAreas}
                  selectedHomeworks={selectedHomeworks}
                  setSelectedHomeworks={setSelectedHomeworks}
                />
              </TabPanel>

              <TabPanel>
                <QuizzesSelector
                  workAreas={workAreas}
                  selectedQuizzes={selectedQuizzes}
                  setSelectedQuizzes={setSelectedQuizzes}
                />
              </TabPanel>

              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
        <Flex justifyContent="center" paddingX={4} paddingBottom={2} w="100%">
        <Button
          mt={4}
          fontFamily="Poppins"
          fontWeight="400"
          colorScheme="blue"
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
