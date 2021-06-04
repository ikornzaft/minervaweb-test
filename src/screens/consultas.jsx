import React, { useState, useEffect } from 'react';
import { Container } from '@chakra-ui/react';

import { useFetchContent } from '../hooks/useFetchContent';
import { FilteredContentsList } from '../components/searchContents/filteredContentsList';

const Consultas = () => {
  const filters = {
    workarea: null,
    workgroup: null,
    worker: null,
    contentTypes: ['article'],
    state: null,
  };

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
    </Container>
  );
};

export { Consultas };
