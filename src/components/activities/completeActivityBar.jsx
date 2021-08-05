import React, { useState } from 'react';
import { Link as ReactRouterLink, useHistory, useParams } from 'react-router-dom';
import { HStack, Button, createStandaloneToast } from '@chakra-ui/react';

const CompleteActivityBar = () => {
  const param = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const completeHandler = () => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/InactiveArticleActivity',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          entity: { publicId: param.id },
        },
      }),
    };

    async function fetchData() {
      const toast = createStandaloneToast();

      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        console.log(resJson);
        toast({
          title: 'Actividad completada',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        history.goBack();
      } catch (err) {
        setError(err);
        toast({
          title: 'No se pudo completar la actividad',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  };

  return (
    <HStack
      alignItems="flex-end"
      h="82px"
      justifyContent="flex-end"
      paddingBottom={1}
      paddingX={2}
      position="fixed"
      w="85rem"
      zIndex="90"
    >
      <HStack justifyContent="center" w="18rem">
        <Button
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          type="button"
          variant="primary"
          w="14rem"
          onClick={completeHandler}
        >
          {' '}
          Marcar como completado
        </Button>
      </HStack>
    </HStack>
  );
};

export { CompleteActivityBar };
