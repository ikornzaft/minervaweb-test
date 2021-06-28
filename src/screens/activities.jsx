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
      console.log(param.id)
      setFilters({ ...filters, workarea: param.id });
      switch (param.id) {
        case 'mate':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_1, color: 'area1' });
          break;
        case 'comunicacion':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_2, color: 'area2' });
          break;
        case 'naturales':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_3, color: 'area3' });
          break;
        case 'sociales':
          setAreaTitle({ title: LABELS.ACTIVITIES.TITLE.AREA_4, color: 'area4' });
          break;
      }
    } else {
      setFilters({ ...filters, workarea: null });
    }
  }, [param.id]);

  //FindActivities
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
  const jsonMessage = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/articles/handlers/FindArticles',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: 'afatecha:YWZhdGVjaGExMjM=',
      message: {
      },
    }),
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        console.log(resJson);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []); 


  //const [content, isLoading, errors] = useFetchContent(filters);
  // ESTO DESPUÉS SE VA
  const content = filters.workarea
    ? ArticlesDb.filter((e) => e.workArea === filters.workarea)
    : ArticlesDb;
  // HASTA ACÁ

  const renderList = () => {
    if (!error) {
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
                width="100%"
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
