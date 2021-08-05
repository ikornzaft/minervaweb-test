import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  Stack,
  Select,
  createStandaloneToast,
  Button,
  Input,
  Textarea,
  Text,
  Box,
  useDisclosure,
} from '@chakra-ui/react';

import { AREAS } from '../../locals/sp/areas';
import { ParagraphReducer } from '../common/paragraphReducer';

import { ExamQuestionsForm } from './examQuestionsForm';
import { ElementMenu } from './elementMenu';

const ExamForm = ({ isOpen, onClose, modalTitle }) => {
  const [examQuestionsArray, setExamQuestionsArray] = useState([]);
  const [forceRender, setForceRender] = useState(true);

  const initialValues = {
    title: '',
    subtitle: '',
    area: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Es necesario un título'),
    subtitle: Yup.string().required('Es necesario ingresar una descripción'),
    area: Yup.string().required('Es necesario seleccionar una materia'),
  });

  const workAreas = [
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ];

  const {
    isOpen: isOpenNewQuestion,
    onOpen: onOpenNewQuestion,
    onClose: onCloseNewQuestion,
  } = useDisclosure();

  const [workareaError, setWorkareaError] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNewQuestion = (e) => {
    onOpenNewQuestion();
  };

  const changeQuestionsArray = (e) => {
    setExamQuestionsArray([...examQuestionsArray, e]);
  };

  const createNewExam = (el) => {
    const date = new Date();
    const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    const examId = 'EX-' + formatedDate + '-' + uuidv4();
    const principal = localStorage.getItem('credentials');
    const newExamToSubmit = {
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/exams/handlers/InsertExam',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: principal,
      message: {
        entity: {
          resource: {
            paragraphs: examQuestionsArray,
            articleHeader: {
              descriptor: {
                subtitle: el.subtitle,
                title: el.title,
              },
            },
            workarea: {
              publicId: el.area,
            },
          },
          header: {
            publicId: examId,
          },
        },
      },
    };

    const fetchData = async () => {
      const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';

      const jsonMessage = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(newExamToSubmit),
      };

      const toast = createStandaloneToast();

      try {
        setLoading(true);
        const response = await fetch(url, jsonMessage);

        if (response.status >= 400 && response.status < 600) setError('Bad response from server');
        const resJson = await response.json();

        console.log(resJson);
        toast({
          title: 'Nuevo examen guardado.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        //borrar data
        setExamQuestionsArray([]);
        onClose();
      } catch (err) {
        error = err;
        toast({
          title: 'Se produjo un error al crear el examen',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  };

  const listItems = (el, index) => {
    const descriptor = el.descriptor;
    let content;

    el.content ? (content = el.content) : (content = null);

    return (
      <HStack
        key={index}
        bgColor="gray.100"
        borderRadius="md"
        justifyContent="space-between"
        marginBottom={2}
        maxWidth="35rem"
        minWidth="30rem"
        paddingX={6}
        paddingY={2}
        width="30rem"
      >
        <Text fontSize="sm" textAlign="left">
          {ParagraphReducer(descriptor.title)}
        </Text>
        <ElementMenu
          forceRender={forceRender}
          index={index}
          isImage="false"
          paragraphList={examQuestionsArray}
          setForceRender={setForceRender}
          setParagraphList={setExamQuestionsArray}
        />
      </HStack>
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
            {modalTitle}
          </ModalHeader>
          <ModalBody textAlign="center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={createNewExam}
            >
              {(props) => (
                <Form>
                  <Stack
                    alignItems="flex-start"
                    direction="row"
                    justifyContent="space-evenly"
                    w="full"
                  >
                    <VStack
                      h="20rem"
                      justifyContent="flex-start"
                      paddingBottom={6}
                      paddingX={6}
                      w="50%"
                    >
                      <Field name="area">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              isInvalid={form.errors['area'] && form.touched['area']}
                              paddingBottom={4}
                              w="15rem"
                            >
                              <Select
                                borderRadius="md"
                                id="area"
                                placeholder="Selecciona la materia"
                                size="sm"
                                w="15rem"
                                {...props}
                                {...field}
                              >
                                {workAreas.map((option) => {
                                  return (
                                    <option key={option.value} value={option.value}>
                                      {option.key}
                                    </option>
                                  );
                                })}
                              </Select>
                              <FormErrorMessage fontSize="xs" position="absolute" top="1.7rem">
                                {form.errors['area']}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>

                      <Field name="title">
                        {({ field, form }) => (
                          <FormControl
                            h={20}
                            isInvalid={form.errors['title'] && form.touched['title']}
                            overflow="hidden"
                            padding="0"
                          >
                            <FormLabel
                              fontFamily="Open Sans"
                              fontSize="sm"
                              htmlFor="title"
                              marginBottom="0"
                            >
                              Título
                            </FormLabel>
                            <Input fontSize="sm" {...props} {...field} id="title" />
                            <FormErrorMessage fontSize="xs" position="absolute" top="3.5rem">
                              {form.errors['title']}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="subtitle">
                        {({ field, form }) => (
                          <FormControl
                            h={32}
                            isInvalid={form.errors['subtitle'] && form.touched['subtitle']}
                            padding="0"
                          >
                            <FormLabel
                              fontFamily="Open Sans"
                              fontSize="sm"
                              htmlFor="subtitle"
                              marginBottom="0"
                            >
                              Descripción
                            </FormLabel>
                            <Textarea
                              fontSize="sm"
                              h="12rem"
                              {...props}
                              {...field}
                              id="subtitle"
                              placeholder="Ingresa la descripción del examen"
                            />
                            <FormErrorMessage fontSize="xs" position="absolute" top="13rem">
                              {form.errors['subtitle']}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                    <VStack
                      borderRadius="md"
                      borderWidth="1px"
                      h="26rem"
                      maxHeight="26rem"
                      overflowY="scroll"
                      paddingLeft={6}
                      paddingTop={4}
                      w="50%"
                    >
                      <Box h="2rem">
                        <Button
                          bgColor="white"
                          colorScheme="blue"
                          fontFamily="Poppins"
                          fontWeight="400"
                          size="sm"
                          variant="outline"
                          width="12rem"
                          onClick={handleNewQuestion}
                        >
                          + Nueva Pregunta
                        </Button>
                      </Box>
                      <VStack paddingTop={2}>
                        {examQuestionsArray.map((el, index) => listItems(el, index))}
                      </VStack>
                    </VStack>
                  </Stack>
                  <HStack
                    alignItems="flex-end"
                    justifyContent="center"
                    paddingBottom={3}
                    paddingTop={6}
                  >
                    <Button
                      colorScheme="blue"
                      fontFamily="Poppins"
                      fontWeight="400"
                      type="submit"
                      w="12rem"
                    >
                      Crear examen
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
      <ExamQuestionsForm
        buttonText="Agregar pregunta"
        changeQuestionsArray={changeQuestionsArray}
        examQuestionsArray={examQuestionsArray}
        isOpen={isOpenNewQuestion}
        modalTitle="Nueva pregunta"
        onClose={onCloseNewQuestion}
      />
    </>
  );
};

export { ExamForm };
