import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Stack, Heading, Box, Spinner } from '@chakra-ui/react';

import { TopicContent } from '../components/forum/topicContent';

const Topic = () => {
  const param = useParams();
  const topic = param.id;
  const [currentTopic, setCurrentTopic] = useState(null);
  const [commentsNumber, setCommentsNumber] = useState(0);
  const [commentsArray, setCommentsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const Loader = () => (
    <Box height="50vh" paddingTop={24}>
      <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
    </Box>
  );

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
        method: 'mods/topics/handlers/GetTopic',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {
          entityRef: {
            publicId: topic,
          },
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        setCurrentTopic(resJson.message.entity);
        setCommentsArray(resJson.message.comments);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id, commentsNumber]);

  if (currentTopic) {
    return (
      <Stack alignItems="center" marginTop={4} paddingBottom={6}>
        {isLoading ? (
          <Loader />
        ) : (
          <Stack
            alignItems="flex-start"
            maxWidth="45rem"
            paddingBottom={6}
            paddingTop={16}
            textAlign="left"
            w="48rem"
          >
            <TopicContent
              commentsArray={commentsArray}
              commentsNumber={commentsNumber}
              setCommentsNumber={setCommentsNumber}
              topic={currentTopic}
            />
          </Stack>
        )}
      </Stack>
    );
  } else {
    return (
      <Stack alignItems="center" marginTop={4} paddingBottom={6}>
        <Loader />
      </Stack>
    );
  }
};

export { Topic };
