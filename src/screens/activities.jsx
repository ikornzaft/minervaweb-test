import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner, Box } from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';
import { useFetchContent } from '../hooks/useFetchContent';
import { ActivitiesList } from '../components/activities/activitiesList';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const credentials = localStorage.getItem('credentials');
  const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';

  const jsonMessage = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/commons/handlers/FindActivities',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: credentials,
      message: {},
    }),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        setActivities(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const renderList = () => {
    if (!error) {
      if (activities.length > 0) {
        return <ActivitiesList activities={activities} />;
      } else {
        return (
          <Box paddingY={12}>
            {localStorage.getItem('isStudent') === 'true' ? <Heading color="gray.400" fontWeight="400">
              No tienes actividades asignadas en este momento
            </Heading> : null}
          </Box>
        );
      }
    }
    <p>error</p>;
  };

  return (
    <Container maxWidth="container.lg" alignSelf="center" pt={12}>
      <Stack direction="column" textAlign="center" paddingTop={6}>
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
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

export { Activities };
