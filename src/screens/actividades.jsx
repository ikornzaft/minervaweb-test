import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner, Image } from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';
import { useFetchContent } from '../hooks/useFetchContent';
import { ActivitiesList } from '../components/feed/activitiesList';
import { ArticlesDb } from '../resources/articlesDb';

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
      : setFilters({ ...filters, workarea: null });
  }, [param.id]);

  //const [content, isLoading, errors] = useFetchContent(filters);
  // ESTO DESPUÉS SE VA
  const content = filters.workarea ? ArticlesDb.filter((e) => e.workArea === filters.workarea) : ArticlesDb;
  const errors = "";
  const isLoading = false;
  // HASTA ACÁ

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
          <Stack
            direction="row"
            w="50rem"
          >
            {param.id === 'matematicas' ? (
              <Heading
                as="h3"
                paddingX={4}
                textAlign="left"
                fontSize="lg"
                fontWeight="400"
                color="gray.600"
                fontFamily="Poppins"
                borderBottomColor="blue.600"
                borderBottomWidth="3px"
              >
                MATEMÁTICAS
              </Heading>
            ) : null}
            {param.id === 'comunicacion' ? (
              <Heading
                as="h3"
                paddingX={4}
                textAlign="left"
                fontSize="lg"
                fontWeight="400"
                color="gray.600"
                fontFamily="Poppins"
                borderBottomColor="orange.400"
                borderBottomWidth="3px"
              >
                COMUNICACIÓN
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
