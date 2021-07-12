import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Spinner, Stack, createStandaloneToast } from '@chakra-ui/react';
import { DraftEditMenu } from '../components/navigation/draftEditMenu';
import { DraftContent } from '../components/draft/draftContent';

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

const Draft = () => {
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [draft, setDraft] = useState(null);
  const [articleHeader, setArticleHeader] = useState(null);
  const [paragraphs, setParagraphs] = useState(null);
  const [sections, setSections] = useState(null);

  const revertDraft = () => {
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
        method: 'mods/articles/handlers/RevertArticleDraft',
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
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();

        toast({
          title: 'Se recuperó el artículo original',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        history.goBack();
      } catch (err) {
        setError(err);
        toast({
          title: 'No pudo recuperarse el artículo',
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

  const publishDraft = () => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const jsonMessage1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/UpdateArticleDraft',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          entity: { publicId: param.id },
          resource: {
            articleHeader: articleHeader,
            paragraphs: paragraphs,
            sections: sections,
          },
        },
      }),
    };
    const jsonMessage2 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/PublishArticleDraft',
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
        let res = await fetch(url, jsonMessage1);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        let resJson = await res.json();
        res = await fetch(url, jsonMessage2);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        resJson = await res.json();
        toast({
          title: 'Se actualizó el artículo original',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        history.goBack();
      } catch (err) {
        setError(err);
        toast({
          title: 'No pudo actualizarse el artículo',
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

  const updateDraft = () => {
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
        method: 'mods/articles/handlers/UpdateArticleDraft',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          entity: { publicId: param.id },
          resource: {
            articleHeader: articleHeader,
            paragraphs: paragraphs,
            sections: sections,
          },
        },
      }),
    };

    async function fetchData() {
      const toast = createStandaloneToast();
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        toast({
          title: 'Se guardó correctamente el borrador',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        history.goBack();
      } catch (err) {
        setError(err);
        toast({
          title: 'No pudo guardarse el borrador',
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

  useEffect(() => {
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
        method: 'mods/articles/handlers/GetArticleDraft',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          entityRef: { publicId: param.id },
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
        setDraft([resJson.message.entity]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id]);

  return (
    <Stack marginTop={4} alignItems="center" paddingBottom={6}>
      <DraftEditMenu
        updateDraft={updateDraft}
        revertDraft={revertDraft}
        publishDraft={publishDraft}
      />
      {draft ? (
        <DraftContent
          draft={draft[0]}
          setArticleHeader={setArticleHeader}
          setParagraphs={setParagraphs}
          setSections={setSections}
        />
      ) : null}
    </Stack>
  );
};

export { Draft };
