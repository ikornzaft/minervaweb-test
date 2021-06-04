import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Stack, Heading } from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';

import { FilteredContentsList } from '../components/searchContents/filteredContentsList';

const Consultas = () => {
  const [contentArray, setContentArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterObject, setFilterObject] = useState({
    workarea: null,
    workgroup: null,
    worker: null,
    contentTypes: ["article"],
    state: null,
  });

  const url='http://afatecha.com:8080/minerva-server-web/minerva/perform';
  const jsonMessage = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      'id': "msgid-1",
      'target': "soa@service/minerva",
      'method': "mods/commons/handlers/FindContents",
      'requester': "root:YWNhY2lhITIwMTc=",
      'principal': "root:cm9vdA==",
      'message': {
        "workarea": null,
        "workgroup": null,
        "worker": null,
        "contentTypes": ["article"],
        "state": null    
      }
    }),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();
        setContentArray(resJson.message.resources);
      } catch(err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filterObject]);

  const renderList = () => {
    console.log(contentArray);
    if (!error) {
      return (<FilteredContentsList contents={contentArray} />)
    };
    <p>error</p>
  }

  return (
    <Container maxWidth="container.lg" alignSelf="center" pt={12}>
      {loading ? <p>Loading...</p> : renderList()}
    </Container>
  );
};

export { Consultas };
