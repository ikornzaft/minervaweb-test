import React, { useState, useEffect } from 'react';
import {
  Container,
  Heading,
  Stack,
  HStack,
  Spinner,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ForumItem } from '../components/forum/forumItem';
import { NewTopicModal } from '../components/forum/newTopicModal';

const Forum = () => {
  const [topicsArray, setTopicsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isStudent = localStorage.getItem('isStudent');
  const {
    isOpen: isOpenTopicModal,
    onOpen: onOpenTopicModal,
    onClose: onCloseTopicModal,
  } = useDisclosure();

  const handleTopicModal = (e) => {
    onOpenTopicModal();
  };

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
        method: 'mods/topics/handlers/FindTopic',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {
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
        setTopicsArray(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const sortedArray = topicsArray.sort(
      (a, b) => new Date(b.inserted.timestamp) - new Date(a.inserted.timestamp)
    );
  }, [topicsArray]);

  return (
    <>
      <HStack
        h="82px"
        borderBottomWidth="1px"
        borderBottomColor="gray.300"
        w="100vw"
        bg="primary_light"
        position="fixed"
        justifyContent="center"
        alignItems="flex-end"
        paddingBottom={1}
        zIndex="90"
      >
        <HStack w="50rem" justifyContent="flex-end">
          <Button
            variant="ghost"
            w="12rem"
            bg="white"
            colorScheme="blue"
            fontFamily="Poppins"
            fontWeight="400"
            size="sm"
            onClick={handleTopicModal}
          >
            + Nueva Publicación
          </Button>
        </HStack>
      </HStack>
      <Container maxWidth="container.lg" alignSelf="center" pt={20}>
        <Stack direction="column" textAlign="center">
          <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
            <Stack direction="row" w="50rem">
              <Heading
                as="h3"
                width="100%"
                paddingRight={8}
                paddingTop={2}
                textAlign="left"
                fontSize="lg"
                fontWeight="400"
                borderBottomColor="primary"
                borderBottomWidth="3px"
              >
                Foro
              </Heading>
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
              topicsArray.map((topic, index) => (
                <Link key={index} to={`/topic/${topic.entity.publicId}`}>
                  <ForumItem topic={topic} index={index} />
                </Link>
              ))
            )}
          </Stack>
        </Stack>
        <NewTopicModal isOpen={isOpenTopicModal} onClose={onCloseTopicModal} />
      </Container>
    </>
  );
};

export { Forum };
