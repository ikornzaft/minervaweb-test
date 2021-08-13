import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';

import { QuizzesList } from '../components/quizzes/quizzesList';
import { FetchComponent } from '../components/common/fetchComponent';
import { LABELS } from '../locals/sp/labels';

const Quizzes = () => {
  const [areaTitle, setAreaTitle] = useState({});
  const [content, setContent] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));
    const message = {
      workgroups: workgroups,
    };
    const method = 'mods/quizzes/handlers/FindQuizzes';

    FetchComponent(method, message, setIsLoading, setError, setContent);
  }, [param.id]);

  useEffect(() => {
    if (content?.message) {
      const sortedArray = content.message.resources.sort(
        (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
      );

      setQuizzes(content.message.resources);
    }
  }, [content, quizzes]);

  const renderList = () => {
    if (!error) {
      return <QuizzesList quizzes={quizzes} />;
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
              Autoevaluaciones
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

export { Quizzes };
