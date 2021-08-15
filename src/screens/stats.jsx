import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { HStack, VStack, Heading, Text } from '@chakra-ui/react';

import { FetchComponent } from '../components/common/fetchComponent';

const Stats = () => {
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [answersEntities, setAnswersEntities] = useState([]);

  const [draft, setDraft] = useState(null);
  const [articleHeader, setArticleHeader] = useState(null);
  const [paragraphs, setParagraphs] = useState([]);
  const [sections, setSections] = useState(null);

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
    const method = `mods/${selectContentType().type}/handlers/${selectContentType().contentMethod}`;
    const message = {
      entityRef: { publicId: param.id },
      workgroup: { publicId: 'aula/test_a/quinto' },
    };

    FetchComponent(method, message, setIsLoading, setError, setContent);
  }, [param.id]);

  useEffect(() => {
    if (!title) {
      setTitle(content?.message.entity.resource.articleHeader.descriptor.title);
    } else {
      setAnswersEntities(content?.message.entities);
    }
  }, [content]);

  useEffect(() => {
    if (title) {
      const method = `mods/${selectContentType().type}/handlers/${selectContentType().method}`;
      const message = {
        entityRef: { publicId: param.id },
        workgroup: { publicId: 'aula/test_a/quinto' },
      };

      FetchComponent(method, message, setIsLoading, setError, setContent);
    }
  }, [title]);

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
      <HStack
        bg="gray.100"
        borderColor="gray.300"
        borderRadius="lg"
        borderWidth="1px"
        paddingX="2rem"
        paddingY="2rem"
        w="49rem"
      >
        <VStack
          bg="white"
          borderColor="gray.300"
          borderRadius="lg"
          borderWidth="1px"
          p={4}
          w="20rem"
        >
          {answersEntities.length > 0 ? (
            answersEntities.map((el, index) => {
              return <p key={index}>{el.resource.worker.publicId}</p>;
            })
          ) : (
            <Text>No hay respuestas aún...</Text>
          )}
        </VStack>
      </HStack>
    </VStack>
  );
};

export { Stats };
