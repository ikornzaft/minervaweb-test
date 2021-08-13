import React, { useState, useEffect } from 'react';
import { Container, Stack, Heading, Spinner, Box } from '@chakra-ui/react';

import { BlueSpinner } from '../components/common/spinner';
import { LABELS } from '../locals/sp/labels';
import { ActivitiesList } from '../components/activities/activitiesList';
import { FetchComponent } from '../components/common/fetchComponent';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [content, setContent] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const message = {};
    const method = 'mods/commons/handlers/FindActivities';

    FetchComponent(method, message, setIsLoading, setError, setContent);
  }, []);

  useEffect(() => {
    if (content?.message) {
      const sortedArray = content.message.resources.sort(
        (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
      );

      setActivities(content.message.resources);
    }
  }, [content, activities]);

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
