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
import { HomeworksSelector } from './homeworksSelector';
import { QuizzesSelector } from './quizzesSelector';

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
  const [section1, setSection1] = useState(null)
  const [section2, setSection2] = useState(null)

  useEffect(() => {
    const [s1, s2] = [...sectionsList];
    setSection1(s1)
    setSection2(s2)
  }, [])

  /* useEffect(() => {
    const homeworks = HomeworksDb;
    setSelectorOptions([]);

    if (homeworks.length > 0) {
      homework.forEach((el) => {
        // Falta filtrar si ese artículo ya fue elegido
        const newOption = {
          key: el.article.publicId,
          value: el.descriptor.articleHeader.descriptor.title,
          subtitle: el.resource.articleHeader.descriptor.subtitle,
        };
        setSelectorOptions((selectorOptions) => [
          ...selectorOptions,
          newOption,
        ]);
      });
    }
  }, []); */

  useEffect(() => {
    setSectionsList([section1, section2])
  }, [section2])

  const submitTodoSection = () => {
    setSection2({...section2, contents: selectedQuizzes})
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
          Agregar a Secciones
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
