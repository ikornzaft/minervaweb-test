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
    <Box paddingTop={24} height="50vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
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
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
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
      <Stack marginTop={4} alignItems="center" paddingBottom={6}>
        {isLoading ? (
          <Loader />
        ) : (
          <Stack
            maxWidth="45rem"
            w="48rem"
            paddingTop={16}
            paddingBottom={6}
            alignItems="flex-start"
            textAlign="left"
          >
            <TopicContent
              topic={currentTopic}
              commentsNumber={commentsNumber}
              setCommentsNumber={setCommentsNumber}
              commentsArray={commentsArray}
            />
          </Stack>
        )}
      </Stack>
    );
  } else {
    return (
      <Stack marginTop={4} alignItems="center" paddingBottom={6}>
        <Loader />
      </Stack>
    );
  }
};

export { Topic };
