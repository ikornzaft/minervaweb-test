import React, { useState, useEffect } from 'react';
import { Container, Heading, Stack } from '@chakra-ui/react';

import { useFetchContent } from '../hooks/useFetchContent';
import { FilteredContentsList } from '../components/searchContents/filteredContentsList';
import { RequestItem } from '../components/requests/requestItem';

const RequestsBoard = ({ requests, setRequests }) => {
  const filters = {
    workarea: null,
    workgroup: null,
    worker: null,
    contentTypes: ['article'],
    state: null,
  };

  useEffect(() => {
    console.log(requests);
  }, []);

  const [content, isLoading, errors] = useFetchContent(filters);

  const renderList = () => {
    if (!errors) {
      return <FilteredContentsList contents={content} />;
    }
    <p>error</p>;
  };

  return (
    <>
      <Container maxWidth="container.lg" alignSelf="center" pt={12}>
        <Stack direction="column" textAlign="center">
          <Stack alignItems="center" padding={2} paddingBottom={8} spacing={6}>
            <Stack direction="column" w="50rem">
              <Heading
                as="h3"
                width="100%"
                paddingRight={8}
                paddingTop={2}
                marginBottom={4}
                textAlign="left"
                fontSize="lg"
                fontWeight="400"
                borderBottomColor="primary"
                borderBottomWidth="3px"
              >
                Consultas
              </Heading>
              {requests.length > 0
                ? requests.map((el) => (
                    <RequestItem
                      request={el.request}
                      title={el.article}
                      area={el.area}
                      date={el.date}
                    />
                  ))
                : null}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export { RequestsBoard };
