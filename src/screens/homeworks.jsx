import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';
import { HomeworksList } from '../components/homeworks/homeworksList';
import { LABELS } from '../locals/sp/labels';

const Homeworks = () => {
  const [workarea, setWorkarea] = useState(null);
  const param = useParams();

  const [homeworks, setHomeworks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        method: 'mods/homeworks/handlers/FindHomeworks',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {
          workarea: { publicId: 'comunicacion' },
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
        setHomeworks(resJson.message.resources);
        console.log(resJson);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id]);

  useEffect(() => {
    const sortedArray = homeworks.sort(
      (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
    );
  }, [homeworks]);

  const renderList = () => {
    if (!error) {
      return <HomeworksList homeworks={homeworks} />;
    }
    <p>error</p>;
  };

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
              Tareas
            </Heading>
          </Stack>
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
            renderList()
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export { Homeworks };
