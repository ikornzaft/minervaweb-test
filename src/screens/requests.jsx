import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Stack,
  HStack,
  Spinner,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { RequestItem } from '../components/requests/requestItem';
import { NewRequestModal } from '../components/requests/newRequestModal';

const RequestsBoard = () => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isStudent = localStorage.getItem('isStudent');
  const {
    isOpen: isOpenRequestModal,
    onOpen: onOpenRequestModal,
    onClose: onCloseRequestModal,
  } = useDisclosure();

  const handleRequestModal = (e) => {
    onOpenRequestModal();
  };

  useEffect(() => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/questions/handlers/FindQuestion',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {
          workgroups: workgroups,
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        setQuestionsArray(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const sortedArray = questionsArray.sort(
      (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
    );
  }, [questionsArray]);

  return (
    <>
      {isStudent === 'true' ? (
        <HStack
          alignItems="flex-end"
          bg="primary_light"
          borderBottomColor="gray.300"
          borderBottomWidth="1px"
          h="82px"
          justifyContent="center"
          paddingBottom={1}
          position="fixed"
          w="100vw"
          zIndex="90"
        >
          <HStack justifyContent="flex-end" w="50rem">
            <Button
              bg="white"
              colorScheme="blue"
              fontFamily="Poppins"
              fontWeight="400"
              size="sm"
              variant="ghost"
              w="12rem"
              onClick={handleRequestModal}
            >
              + Nueva Consulta
            </Button>
          </HStack>
        </HStack>
      ) : null}
      <Container alignSelf="center" maxWidth="container.lg" pt={isStudent === 'true' ? 20 : 12}>
        <Stack direction="column" textAlign="center">
          <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
            <Stack direction="row" w="50rem">
              <Heading
                as="h3"
                borderBottomColor="primary"
                borderBottomWidth="3px"
                fontSize="lg"
                fontWeight="400"
                paddingRight={8}
                paddingTop={2}
                textAlign="left"
                width="100%"
              >
                Consultas
              </Heading>
            </Stack>

            {isLoading ? (
              <Spinner color="primary" emptyColor="white" size="xl" speed="0.65s" thickness="4px">
                Loading...
              </Spinner>
            ) : (
              questionsArray.map((question, index) => (
                <Link key={index} to={`/request/${question.entity.publicId}`}>
                  <RequestItem index={index} question={question} />
                </Link>
              ))
            )}
          </Stack>
        </Stack>
        <NewRequestModal isOpen={isOpenRequestModal} onClose={onCloseRequestModal} />
      </Container>
    </>
  );
};

export { RequestsBoard };
