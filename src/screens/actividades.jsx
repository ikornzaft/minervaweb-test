import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';
import { useFetchContent } from '../hooks/useFetchContent';
import { ActivitiesList } from '../components/activitiesList';

const Actividades = () => {
  const param = useParams();
  const [filters, setFilters] = useState({
    workarea: 'all',
    workgroup: null,
    worker: null,
    contentTypes: null,
    state: null,
  });

  useEffect(() => {
    param.id
    ? setFilters({ ...filters, workarea: param.id })
    : setFilters({ ...filters, workarea: 'all' });
  }, [param.id]);
  
  const [content, isLoading, errors] = useFetchContent(filters);
  
  const renderList = () => {
    if (!errors) {
      return <ActivitiesList contents={content} />;
    }
    <p>error</p>;
  };

  return (
    <Container maxWidth="container.lg" alignSelf="center" pt={12}>
      <Stack direction="column" textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
          <Stack direction="row">
            <Heading as="h3" fontSize="xl" fontWeight="100" color="gray.600">
              {param.id
                ? LABELS.ACTIVIDADES.TITLE.SUBJECT
                : LABELS.ACTIVIDADES.TITLE.PENDENT}
            </Heading>
            {param.id ? (
              <Heading as="h3" fontSize="xl" fontWeigth="100" color="blue.500">
                {' '}
                {param.id}{' '}
              </Heading>
            ) : null}
          </Stack>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
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

export { Actividades };
