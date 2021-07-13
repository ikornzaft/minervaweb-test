import React, { useState, useEffect } from 'react';
import { Container, Heading, Stack, Spinner, Button, useDisclosure } from '@chakra-ui/react';

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
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
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

  return (
    <Container maxWidth="container.lg" alignSelf="center" pt={12}>
      <Stack direction="column" textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
          <Stack direction="row" w="50rem">
            <Heading
              as="h3"
              width="100%"
              paddingRight={8}
              paddingTop={2}
              textAlign="left"
              fontSize="lg"
              fontWeight="400"
              borderBottomColor="primary"
              borderBottomWidth="3px"
            >
              Consultas
            </Heading>
          </Stack>
          {isStudent === 'true' ? <Button variant="primary" w="15rem" onClick={handleRequestModal}>Crear una nueva consulta</Button> : null}

          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="white"
              color="primary"
              size="xl"
            >
              Loading...
            </Spinner>
          ) : (
            questionsArray.map((question, index) => (
              <RequestItem question={question} index={index} />
            ))
          )}
        </Stack>
      </Stack>
      <NewRequestModal isOpen={isOpenRequestModal} onClose={onCloseRequestModal} />
    </Container>
  );
};

export { RequestsBoard };
