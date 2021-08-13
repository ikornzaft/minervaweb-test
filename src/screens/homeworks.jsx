import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';

import { HomeworksList } from '../components/homeworks/homeworksList';
import { FetchComponent } from '../components/common/fetchComponent';
import { LABELS } from '../locals/sp/labels';

const Homeworks = () => {
  const param = useParams();

  const [homeworks, setHomeworks] = useState([]);
  const [content, setContent] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));
    const message = {
      workgroups: workgroups,
    };
    const method = 'mods/homeworks/handlers/FindHomeworks';

    FetchComponent(method, message, setIsLoading, setError, setContent);
  }, [param.id]);

  useEffect(() => {
    if (content?.message) {
      const sortedArray = content.message.resources.sort(
        (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
      );

      setHomeworks(content.message.resources);
    }
  }, [content, homeworks]);

  const renderList = () => {
    if (!error) {
      return <HomeworksList homeworks={homeworks} />;
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
              Tareas
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

export { Homeworks };
