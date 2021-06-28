import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  createStandaloneToast,
  FormLabel,
  FormControl,
  Button,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
  Stack,
  HStack,
  Flex,
  Box,
} from '@chakra-ui/react';
import { AreaSelector } from './areaSelector';
import { QuizHeaderForm } from './quizHeaderForm';
import { QuizQuestionsForm } from './quizQuestionsForm';
import { QuizQuestionsList } from './quizQuestionsList';

const QuizForm = ({ isOpen, onClose, modalTitle }) => {
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizWorkarea, setNewQuizWorkarea] = useState(null);
  const [newQuizQuestionsArray, setNewQuizQuestionsArray] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);

  const changeWorkArea = (e) => {
    setNewQuizWorkarea(e);
  }
  const changeQuizTitle = (e) => {
    setNewQuizTitle(e);
  }

  const changeQuestionsArray = (e) => {
    setNewQuizQuestionsArray([...newQuizQuestionsArray, e])
  }

  const createNewQuiz = () => {
    const randomId = uuidv4();
    const newQuizToSubmit = {

        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/quizzes/handlers/InsertQuiz',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: 'root:cm9vdA==',
        message: {
          entity: {
            resource: {
              paragraphs: newQuizQuestionsArray,
              articleHeader: {
                descriptor: {
                  subtitle: "",
                  title: newQuizTitle,
                },
              },
              workarea: newQuizWorkarea,
            },
            header: {
              schema: 'm:quiz',
              privateId: 'test/1',
              scope: 'PUBLIC',
              publicId: randomId,
            },
          },
        },

    }

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
            <AreaSelector newQuizWorkarea={newQuizTitle} setNewQuizWorkarea={changeWorkArea} />
            <QuizHeaderForm newQuizTitle={newQuizTitle} setNewQuizTitle={changeQuizTitle} />
            <QuizQuestionsForm newQuizQuestionsArray={newQuizQuestionsArray} setNewQuizQuestionsArray={changeQuestionsArray} />
            <QuizQuestionsList newQuizQuestionsArray={newQuizQuestionsArray} setNewQuizQuestionsArray={changeQuestionsArray} />
            <Button onClick={createNewQuiz}>Crear autoevaluación</Button>
          </ModalBody>


          <ModalCloseButton />
        </ModalContent>
      </Modal>

    </>
  );
};

export { QuizForm }
