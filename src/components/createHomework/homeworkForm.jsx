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

import { HomeworkQuestionsForm } from './homeworkQuestionsForm';
import { ElementMenu } from './elementMenu';
import { ParagraphReducer } from '../common/paragraphReducer';

const HomeworkForm = ({ isOpen, onClose, modalTitle }) => {
  const [homeworkQuestionsArray, setHomeworkQuestionsArray] = useState([]);
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
    setHomeworkQuestionsArray([...homeworkQuestionsArray, e]);
  };

  const createNewHomework = (el) => {
    console.log(homeworkQuestionsArray)
    const date = new Date();
    const formatedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);
    const homeworkId = 'EX-' + formatedDate + '-' + uuidv4();
    const principal = localStorage.getItem('credentials');
    const newHomeworkToSubmit = {
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/homeworks/handlers/InsertHomework',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: principal,
      message: {
        entity: {
          resource: {
            paragraphs: homeworkQuestionsArray,
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
            publicId: homeworkId,
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
        body: JSON.stringify(newHomeworkToSubmit),
      };

      const toast = createStandaloneToast();

      try {
        setLoading(true);
        const response = await fetch(url, jsonMessage);
        if (response.status >= 400 && response.status < 600)
          setError('Bad response from server');
        const resJson = await response.json();
        console.log(resJson);
        toast({
          title: 'Nueva tarea guardada.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        //borrar data
        setHomeworkQuestionsArray([]);
        onClose();
      } catch (err) {
        error = err;
        toast({
          title: 'Se produjo un error al crear la tarea',
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
        width="30rem"
        maxWidth="35rem"
        minWidth="30rem"
        paddingY={2}
        paddingX={6}
        bgColor="gray.100"
        borderRadius="md"
        marginBottom={2}
        justifyContent="space-between"
      >
        <Text fontSize="sm" textAlign="left">
          {ParagraphReducer(descriptor.title)}
        </Text>
        <ElementMenu
          index={index}
          paragraphList={homeworkQuestionsArray}
          setParagraphList={setHomeworkQuestionsArray}
          forceRender={forceRender}
          setForceRender={setForceRender}
          isImage="false"
        />
      </HStack>
    );
  };

  return (
    <>
      <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <ModalHeader
            alignSelf="center"
            color="gray.700"
            fontFamily="Poppins"
            fontWeight="300"
          >
            {modalTitle}
          </ModalHeader>
          <ModalBody textAlign="center">
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={createNewHomework}
            >
              {(props) => (
                <Form>
                  <Stack
                    direction="row"
                    w="full"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                  >
                    <VStack
                      paddingX={6}
                      w="50%"
                      h="20rem"
                      paddingBottom={6}
                      justifyContent="flex-start"
                    >
                      <Field name="area">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              w="15rem"
                              paddingBottom={4}
                              isInvalid={
                                form.errors['area'] && form.touched['area']
                              }
                            >
                              <Select
                                placeholder="Selecciona la materia"
                                borderRadius="md"
                                size="sm"
                                w="15rem"
                                id="area"
                                {...props}
                                {...field}
                              >
                                {workAreas.map((option) => {
                                  return (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.key}
                                    </option>
                                  );
                                })}
                              </Select>
                              <FormErrorMessage
                                position="absolute"
                                top="1.7rem"
                                fontSize="xs"
                              >
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
                            overflow="hidden"
                            padding="0"
                            isInvalid={
                              form.errors['title'] && form.touched['title']
                            }
                          >
                            <FormLabel
                              fontSize="sm"
                              fontFamily="Open Sans"
                              htmlFor="title"
                              marginBottom="0"
                            >
                              Título
                            </FormLabel>
                            <Input
                              fontSize="sm"
                              {...props}
                              {...field}
                              id="title"
                            />
                            <FormErrorMessage
                              position="absolute"
                              top="3.5rem"
                              fontSize="xs"
                            >
                              {form.errors['title']}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="subtitle">
                        {({ field, form }) => (
                          <FormControl
                            h={32}
                            padding="0"
                            isInvalid={
                              form.errors['subtitle'] &&
                              form.touched['subtitle']
                            }
                          >
                            <FormLabel
                              fontSize="sm"
                              fontFamily="Open Sans"
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
                              placeholder="Ingresa la descripción de la tarea"
                            />
                            <FormErrorMessage
                              position="absolute"
                              top="13rem"
                              fontSize="xs"
                            >
                              {form.errors['subtitle']}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </VStack>
                    <VStack
                      w="50%"
                      h="26rem"
                      maxHeight="26rem"
                      overflowY="scroll"
                      borderWidth="1px"
                      borderRadius="md"
                      paddingLeft={6}
                      paddingTop={4}
                    >
                      <Box h="2rem">
                        <Button
                          variant="outline"
                          colorScheme="blue"
                          bgColor="white"
                          size="sm"
                          width="12rem"
                          fontFamily="Poppins"
                          fontWeight="400"
                          onClick={handleNewQuestion}
                        >
                          + Nueva Consigna
                        </Button>
                      </Box>
                      <VStack paddingTop={2}>
                        {homeworkQuestionsArray.map((el, index) =>
                          listItems(el, index)
                        )}
                      </VStack>
                    </VStack>
                  </Stack>
                  <HStack
                    justifyContent="center"
                    alignItems="flex-end"
                    paddingTop={6}
                    paddingBottom={3}
                  >
                    <Button
                      type="submit"
                      w="12rem"
                      colorScheme="blue"
                      fontFamily="Poppins"
                      fontWeight="400"
                    >
                      Crear tarea
                    </Button>
                  </HStack>
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
      <HomeworkQuestionsForm
        isOpen={isOpenNewQuestion}
        onClose={onCloseNewQuestion}
        modalTitle="Nueva consigna"
        buttonText="Agregar consigna"
        homeworkQuestionsArray={homeworkQuestionsArray}
        changeQuestionsArray={changeQuestionsArray}
      />
    </>
  );
};

export { HomeworkForm };
