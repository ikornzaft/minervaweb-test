import React, { useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';

import { useFetchContent } from '../hooks/useFetchContent';
import { FilteredContentsList } from '../components/searchContents/filteredContentsList';

const RequestsBoard = ({requests, setRequests}) => {
  const filters = {
    workarea: null,
    workgroup: null,
    worker: null,
    contentTypes: ['article'],
    state: null,
  };
  
  useEffect(() => {

    console.log(requests);
    
  }, [])

  const [content, isLoading, errors] = useFetchContent(filters);

  const renderList = () => {
    if (!errors) {
      return <FilteredContentsList contents={content} />;
    }
    <p>error</p>;
  };

  return (
    <Container maxWidth="container.lg" alignSelf="center" pt={12}>
      {isLoading ? <p>Loading...</p> : renderList()}
      <h1>{requests.length > 0 ? requests.map(el => el.request) : null}</h1>
    </Container>
  );
};

export { RequestsBoard };
