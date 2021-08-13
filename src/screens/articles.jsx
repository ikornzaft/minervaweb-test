import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';

import { ArticlesList } from '../components/articles/articlesList';
import { FetchComponent } from '../components/common/fetchComponent';
import { LABELS } from '../locals/sp/labels';

const Articles = () => {
  const [workarea, setWorkarea] = useState(null);
  const [areaTitle, setAreaTitle] = useState({});
  const param = useParams();

  useEffect(() => {
    console.log('ACA');
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

  const [articles, setArticles] = useState([]);
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));

  useEffect(() => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const message = {
      workarea: {
        publicId: param.id,
      },
      workgroups: workgroups,
    };

    const method = 'mods/articles/handlers/FindArticles';

    FetchComponent(method, message, setIsLoading, setError, setContent);
  }, [param.id]);

  useEffect(() => {
    if (content?.message) {
      const sortedArray = content.message.resources.sort(
        (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
      );

      setArticles(content.message.resources);
    }
  }, [content, articles]);

  const renderList = () => {
    if (!error) {
      return <ArticlesList articles={articles} />;
    }
    <p>error</p>;
  };

  return (
    <Container alignSelf="center" maxWidth="container.lg" pt={12}>
      <Stack direction="column" textAlign="center">
        <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
          <Stack direction="row" w="50rem">
            {areaTitle.title ? (
              <Heading
                as="h3"
                borderBottomColor={areaTitle.color}
                borderBottomWidth="3px"
                fontSize="lg"
                fontWeight="400"
                paddingRight={8}
                paddingTop={2}
                textAlign="left"
                width="100%"
              >
                {areaTitle.title}
              </Heading>
            ) : null}
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

export { Articles };
