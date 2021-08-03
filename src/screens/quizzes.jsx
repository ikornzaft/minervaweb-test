import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';
import { QuizzesList } from '../components/quizzes/quizzesList';
import { LABELS } from '../locals/sp/labels';

const Quizzes = () => {
  const [workarea, setWorkarea] = useState(null);
  const [areaTitle, setAreaTitle] = useState({});
  const param = useParams();

  useEffect(() => {
    if (param.id) {
      switch (param.id) {
        case 'mate':
          setAreaTitle({
            title: LABELS.ACTIVITIES.TITLE.AREA_1,
            color: 'area1',
          });
          break;
        case 'comunicacion':
          setAreaTitle({
            title: LABELS.ACTIVITIES.TITLE.AREA_2,
            color: 'area2',
          });
          break;
        case 'naturales':
          setAreaTitle({
            title: LABELS.ACTIVITIES.TITLE.AREA_3,
            color: 'area3',
          });
          break;
        case 'sociales':
          setAreaTitle({
            title: LABELS.ACTIVITIES.TITLE.AREA_4,
            color: 'area4',
          });
          break;
        case 'research':
          setAreaTitle({
            title: LABELS.ACTIVITIES.TITLE.AREA_5,
            color: 'area5',
          });
      }
    }
  }, [param.id]);

  const [quizzes, setQuizzes] = useState([]);
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
        method: 'mods/quizzes/handlers/FindQuizzes',
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
        setQuizzes(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id]);

  useEffect(() => {
    const sortedArray = quizzes.sort(
      (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
    );
  }, [quizzes]);

  const renderList = () => {
    if (!error) {
      return <QuizzesList quizzes={quizzes} />;
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
              Autoevaluaciones
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

export { Quizzes };
