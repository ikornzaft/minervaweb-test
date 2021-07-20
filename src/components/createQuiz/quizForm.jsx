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
  useDisclosure,
} from '@chakra-ui/react';
import { AREAS } from '../../locals/sp/areas';
import { AreaSelector } from './areaSelector';
import { QuizHeaderForm } from './quizHeaderForm';
import { QuizQuestionsForm } from './quizQuestionsForm';
import { QuizQuestionsList } from './quizQuestionsList';

const QuizForm = ({ isOpen, onClose, modalTitle }) => {
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizSubtitle, setNewQuizSubtitle] = useState('');
  const [newQuizWorkarea, setNewQuizWorkarea] = useState(null);
  const [quizQuestionsArray, setQuizQuestionsArray] = useState([]);

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
  const [serverResponse, setServerResponse] = useState(null);

  const handleNewQuestion = (e) => {
    onOpenNewQuestion();
  };

  const changeWorkArea = (e) => {
    setNewQuizWorkarea(e);
  };
  const changeQuizTitle = (e) => {
    setNewQuizTitle(e);
  };

  const changeQuestionsArray = (e) => {
    setQuizQuestionsArray([...quizQuestionsArray, e]);
  };

  const createNewQuiz = () => {
    if (!newQuizWorkarea) {
      setWorkareaError(true);
    } else {
      const randomId = uuidv4();
      const principal = localStorage.getItem('credentials');
      const newQuizToSubmit = {
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/quizzes/handlers/InsertQuiz',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: principal,
        message: {
          entity: {
            resource: {
              paragraphs: quizQuestionsArray,
              articleHeader: {
                descriptor: {
                  subtitle: '',
                  title: newQuizTitle,
                },
              },
              workarea: {
                publicId: newQuizWorkarea,
              },
            },
            header: {
              publicId: randomId,
            },
          },
        },
      };
      console.log(newQuizToSubmit);

      const fetchData = async () => {
        const url =
          'http://afatecha.com:8080/minerva-server-web/minerva/perform';

        const jsonMessage = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(newQuizToSubmit),
        };

        const toast = createStandaloneToast();

        try {
          setLoading(true);
          const response = await fetch(url, jsonMessage);
          if (response.status >= 400 && response.status < 600)
            setError('Bad response from server');
          const resJson = await response.json();
          console.log(resJson);
          setServerResponse(resJson);
          toast({
            title: 'Nueva autoevaluación guardada.',
            status: 'success',
            duration: 2500,
            isClosable: true,
          });
          //borrar data

          onClose();
        } catch (err) {
          error = err;
          toast({
            title: 'Se produjo un error al crear la autoevaluación',
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
    }
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
              onSubmit={createNewQuiz}
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
                      h="30rem"
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
                              placeholder="Ingresa la descripción de la autoevaluación"
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
                        + Nueva Pregunta
                      </Button>
                    </VStack>
                  </Stack>
                </Form>
              )}
            </Formik>

            <HStack
              justifyContent="space-between"
              alignItems="flex-end"
              paddingY={6}
            ></HStack>

            <Button
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
              onClick={createNewQuiz}
            >
              Crear autoevaluación
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <QuizQuestionsForm
        isOpen={isOpenNewQuestion}
        onClose={onCloseNewQuestion}
        modalTitle="Nueva pregunta"
        quizQuestionsArray={quizQuestionsArray}
        setQuizQuestionsArray={changeQuestionsArray}
      />
    </>
  );
};

export { QuizForm };

/*


id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/quizzes/handlers/InsertQuiz',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: 'afatecha:YWZhdGVjaGExMjM=',
        message: {
          entity: {
            resource: {
              paragraphs: quizQuestionsArray,
              // [
                { 
                  resourceId: "", -> asignarlo para identificar correctamente
                  descriptor: {
                    title: ""
                    subtitle: ""
                  },
                 content: {
                   type: "text / choice" PARA EXAMS
                  link: (artículo: objeto link)
                  options: [
                    {
                      descriptor: {
                        title: 
                      },
                      answer: (boolean)
                    }
                  ]
                  
                }
                  

                }
                }
              ]
              articleHeader: {
                descriptor: {
                  subtitle: '',
                  title: newQuizTitle,
                },
              },
              workarea: newQuizWorkarea,
            },
            header: {
              publicId: randomId,
            },
          },
        },


        */
