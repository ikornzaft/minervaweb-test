import React, { useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';

import { useFetchContent } from '../hooks/useFetchContent';
import { FilteredContentsList } from '../components/searchContents/filteredContentsList';
import { RequestItem } from '../components/requests/requestItem';

const Exams = ({ requests, setRequests }) => {
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
    <Container maxWidth="container.lg" alignSelf="center" pt={12}>
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
    </Container>
  );
};

export { Exams };
