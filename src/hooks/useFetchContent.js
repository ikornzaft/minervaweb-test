import React, { useState, useEffect } from 'react';

const useFetchContent = (filter) => {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
  const jsonMessage = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/commons/handlers/FindContents',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: 'root:cm9vdA==',
      message: {
        workarea: null,
        workgroup: null,
        worker: null,
        contentTypes: filter.contentTypes,
        state: null,
      },
    }),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setErrors('Bad response from server');
        const resJson = await res.json();

        setContent(resJson.message.resources);
      } catch (err) {
        setErrors(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [filter]);

  return [content, isLoading, errors];
};

export { useFetchContent };
