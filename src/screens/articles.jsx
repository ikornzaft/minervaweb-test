import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading, Spinner } from '@chakra-ui/react';
import { ArticlesList } from '../components/articles/articlesList';
import { LABELS } from '../locals/sp/labels';

const Articles = () => {
  const [workarea, setWorkarea] = useState(null);
  const [areaTitle, setAreaTitle] = useState({});
  const param = useParams();

  useEffect(() => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));
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
        principal: credentials,
        message: {
          workarea: {
            publicId: param.id,
          },
          workgroups: workgroups,
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        setArticles(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id]);

  useEffect(() => {
    const sortedArray = articles.sort(
      (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
    );
  }, [articles]);

  const renderList = () => {
    if (!error) {
      return <ArticlesList articles={articles} />;
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

export { Articles };
