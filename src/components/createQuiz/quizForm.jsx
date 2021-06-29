import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  VStack,
  HStack,
  createStandaloneToast,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { AreaSelector } from './areaSelector';
import { QuizHeaderForm } from './quizHeaderForm';
import { QuizQuestionsForm } from './quizQuestionsForm';
import { QuizQuestionsList } from './quizQuestionsList';

const QuizForm = ({ isOpen, onClose, modalTitle }) => {
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizWorkarea, setNewQuizWorkarea] = useState(null);
  const [newQuizQuestionsArray, setNewQuizQuestionsArray] = useState([]);

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
    setNewQuizQuestionsArray([...newQuizQuestionsArray, e]);
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
              paragraphs: newQuizQuestionsArray,
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
      };
      console.log(newQuizToSubmit)

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
          console.log(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} size="4xl" onClose={onClose}>
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
            <VStack justifyContent="center">
              <AreaSelector
                newQuizWorkarea={newQuizTitle}
                setNewQuizWorkarea={changeWorkArea}
                workareaError={workareaError}
              />
              <HStack justifyContent="space-between" alignItems="flex-end" paddingY={6}>
                <QuizHeaderForm
                  newQuizTitle={newQuizTitle}
                  setNewQuizTitle={changeQuizTitle}
                />
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
              </HStack>
              <QuizQuestionsList
                newQuizQuestionsArray={newQuizQuestionsArray}
                setNewQuizQuestionsArray={changeQuestionsArray}
              />
              <Button
                colorScheme="blue"
                fontFamily="Poppins"
                fontWeight="400"
                onClick={createNewQuiz}
              >
                Crear autoevaluación
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <QuizQuestionsForm
        isOpen={isOpenNewQuestion}
        onClose={onCloseNewQuestion}
        modalTitle="Nueva pregunta"
        newQuizQuestionsArray={newQuizQuestionsArray}
        setNewQuizQuestionsArray={changeQuestionsArray}
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
              paragraphs: newQuizQuestionsArray,
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