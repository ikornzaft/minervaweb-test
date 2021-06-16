import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';
import { useFetchContent } from '../hooks/useFetchContent';
import { ActivitiesList } from '../components/activities/activitiesList';
import { ArticlesDb } from '../resources/articlesDb';

const Activities = () => {
  const param = useParams();
  const [filters, setFilters] = useState({
    workarea: 'all',
    workgroup: null,
    worker: null,
    contentTypes: null,
    state: null,
  });
  const [areaTitle, setAreaTitle] = useState({ title: '', color: '' });
  useEffect(() => {
    if (param.id) {
      setFilters({ ...filters, workarea: param.id });
      switch (param.id) {
        case 'matematicas':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_1, color: 'area1' });
          break;
        case 'comunicacion':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_2, color: 'area2' });
          break;
        case 'ciencias_naturales':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_3, color: 'area3' });
          break;
        case 'estudios_sociales':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_4, color: 'area4' });
          break;
      }
    } else {
      setFilters({ ...filters, workarea: null });
    }
  }, [param.id]);

  //const [content, isLoading, errors] = useFetchContent(filters);
  // ESTO DESPUÉS SE VA
  const content = filters.workarea
    ? ArticlesDb.filter((e) => e.workArea === filters.workarea)
    : ArticlesDb;
  const errors = '';
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
          <Stack direction="row" w="50rem">
            {areaTitle.title ? (
              <Heading
                as="h3"
                paddingRight={8}
                paddingTop={2}
                textAlign="left"
                fontSize="lg"
                fontWeight="400"
                borderBottomColor={areaTitle.color}
                borderBottomWidth="3px"
              >
                {areaTitle.title}
              </Heading>
            ) : null}
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

export { Activities };
