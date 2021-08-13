import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';

import { ExamsList } from '../components/exams/examsList';
import { FetchComponent } from '../components/common/fetchComponent';
import { LABELS } from '../locals/sp/labels';

const Exams = () => {
  const param = useParams();

  const [exams, setExams] = useState([]);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));
    const message = {
      workgroups: workgroups,
    };
    const method = 'mods/exams/handlers/FindExams';

    FetchComponent(method, message, setIsLoading, setError, setContent);
  }, [param.id]);

  useEffect(() => {
    if (content?.message) {
      const sortedArray = content.message.resources.sort(
        (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
      );

      setExams(content.message.resources);
    }
  }, [content, exams]);

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
