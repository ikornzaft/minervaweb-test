import React, { useState, useEffect } from 'react';
import { Container, Stack, Heading, Spinner, Box } from '@chakra-ui/react';

import { BlueSpinner } from '../components/common/spinner';
import { LABELS } from '../locals/sp/labels';
import { ActivitiesList } from '../components/activities/activitiesList';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const credentials = localStorage.getItem('credentials');
  const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';

  useEffect(() => {
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

    async function fetchData() {
      try {
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        setActivities(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [credentials]);

  useEffect(() => {
    const sortedArray = activities.sort(
      (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
    );
  }, [activities]);

  const renderList = () => {
    if (!error) {
      if (activities.length > 0) {
        return <ActivitiesList activities={activities} />;
      } else {
        return (
          <Box paddingY={12}>
            {localStorage.getItem('isStudent') === 'true' ? (
              <Heading color="gray.400" fontWeight="400">
                {LABELS.ACTIVITIES.EMPTY_LIST.TEXT}
              </Heading>
            ) : null}
          </Box>
        );
      }
    }
    <p>error</p>;
  };

  return (
    <Container alignSelf="center" maxWidth="container.lg" pt={12}>
      <Stack direction="column" paddingTop={6} textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
          {isLoading ? <BlueSpinner /> : renderList()}
        </Stack>
      </Stack>
    </Container>
  );
};

export { Activities };
