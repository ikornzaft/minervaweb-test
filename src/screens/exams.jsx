import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';

import { ExamsList } from '../components/exams/examsList';
import { LABELS } from '../locals/sp/labels';

const Exams = () => {
  const [workarea, setWorkarea] = useState(null);
  const param = useParams();

  const [exams, setExams] = useState([]);
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
        method: 'mods/exams/handlers/FindExams',
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

        setExams(resJson.message.resources);
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
    const sortedArray = exams.sort(
      (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
    );
  }, [exams]);

  const renderList = () => {
    if (!error) {
      return <ExamsList exams={exams} />;
    }
    <p>error</p>;
  };

  return (
    <Container alignSelf="center" maxWidth="container.lg" pt={12}>
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
              Examenes
            </Heading>
          </Stack>
          {isLoading ? (
            <Spinner color="primary" emptyColor="white" size="xl" speed="0.65s" thickness="4px">
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

export { Exams };
