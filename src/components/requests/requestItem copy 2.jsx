import React, { useState, useEffect } from 'react';
import {
  Stack,
  Badge,
  Text,
  Heading,
  Box,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { ParagraphReducer } from '../common/paragraphReducer';
import { ArticlesDb } from '../../resources/articlesDb';

const RequestItem = ({ question }) => {

  const [currentQuestion, setCurrentQuestion] = useState([]);
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
        method: 'mods/questions/handlers/GetQuestion',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {
          entityRef: {
            publicId: question,
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
        setCurrentQuestion([resJson]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <VStack
      width="50rem"
      bgColor="gray.50"
      borderRadius="lg"
      justifyContent="flex-start"
      alignItems="flex-start"
      direction="row"
      borderStyle="solid"
      borderWidth="1px"
      _hover={{ bg: 'gray.100' }}
    >
      {currentQuestion.map((q) => {
        console.log(q);
        const badge = CreateAreaBadge(
          q.message.entity.resource.workarea.publicId
        );
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const requestDate = new Date(
          q.message.entity.logs.inserted.timestamp
        ).toLocaleDateString('es-Es', options);
        const articleTitle =
          q.message.entity.resource.articleHeader.descriptor.title;
        const request =
          q.message.entity.resource.paragraphs[0].descriptor.title;
        return (
          <>
            <VStack
              direction="row"
              w="100%"
              justifyContent="flex-start"
              alignItems="flex-start"
              paddingX={6}
              marginX={2}
            >
              <HStack paddingTop={4}>
                <Box paddingRight={2}>
                  <Heading
                    as="h3"
                    size="sm"
                    marginLeft={0}
                    lineHeight="0.7rem"
                    color="gray.700"
                    fontFamily="Open Sans"
                  >
                    {articleTitle}
                  </Heading>
                </Box>
                <Badge paddingX={2} colorScheme={badge.color}>
                  {badge.content}
                </Badge>
              </HStack>
              <HStack paddingBottom={1}>

                <Text color="gray.500" fontSize="xs">
                  Publicado por </Text> 
                  <Text fontSize="xs" marginLeft="4px !important" fontFamily="Open Sans" fontWeight="700" color="primary">
                  {q.message.entity.resource.worker.publicId}
                </Text>
                <Text color="gray.500" fontSize="xs" marginLeft="4px !important"> el {requestDate}
                </Text>
                
              </HStack>
              <Stack textAlign="left" paddingBottom={4}>
                <Text as="h5" fontSize="sm" fontWeight="400">
                  {ParagraphReducer(request)}
                </Text>
              </Stack>
            </VStack>

          </>
        );
      })}
    </VStack>
  );
};

export { RequestItem };