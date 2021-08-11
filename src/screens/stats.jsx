import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Spinner,
  Stack,
  HStack,
  VStack,
  Heading,
  createStandaloneToast,
} from '@chakra-ui/react';

const Stats = () => {
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [draft, setDraft] = useState(null);
  const [articleHeader, setArticleHeader] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState(null);

  //ESTO SE VA

  const selectContentType = () => {
    if (param.id.slice(0, 1) === 'E')
      return {
        contentMethod: 'GetExam',
        method: 'FindExamResponses',
        type: 'exams',
        label: 'Examen',
      };
    if (param.id.slice(0, 1) === 'H')
      return {
        contentMethod: 'GetHomework',
        method: 'FindHomeworkResponses',
        type: 'homeworks',
        label: 'Tarea',
      };
  };

  useEffect(() => {
    console.log('HOLA');
    const contentType = selectContentType();
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
        method: `mods/${selectContentType().type}/handlers/${selectContentType().contentMethod}`,
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

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        setParagraphs(resJson.message.entity.resource.paragraphs);
        setTitle(resJson.message.entity.resource.articleHeader.descriptor.title);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    /*
    console.log(contentType);
    
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: `mods/${selectContentType().type}/handlers/${selectContentType().method}`,
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,

        message: {
          entityRef: { publicId: 'EX-2021-08-06-bda9837c-43e1-4bf5-946c-c54f575b3669' },
          workgroup: { publicId: 'aula/test_a/quinto' },
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        console.log(resJson);

        //
        setDraft([resJson.message.entity]);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    */
  }, [param.id]);

  return (
    <VStack alignItems="center" paddingTop={16}>
      <HStack paddingBottom={4}>
        <Heading color="gray.600" fontSize="lg" fontWeight="400">
          {selectContentType().label} :
        </Heading>
        <Heading fontSize="2xl" fontWeight="400">
          {title}
        </Heading>
      </HStack>
      <VStack
        alignItems="flex-start"
        bg="gray.100"
        borderColor="gray.300"
        borderRadius="lg"
        borderWidth="1px"
        paddingX="2rem"
        paddingY="2rem"
        w="49rem"
      >
        HOLA
      </VStack>
    </VStack>
  );
};

export { Stats };
