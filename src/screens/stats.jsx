import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { HStack, VStack, Heading, Text } from '@chakra-ui/react';

import { FetchComponent } from '../components/common/fetchComponent';
import { StudentsList } from '../components/stats/studentsList';
import { StudentAnswers } from '../components/stats/studentAnswers';
import { WorkgroupSelector } from '../components/common/workgroupSelector';
import { ParagraphList } from '../components/stats/paragraphList';

const Stats = () => {
  const history = useHistory();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [answersEntities, setAnswersEntities] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState('');

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
      workgroup: { publicId: selectedGroup },
    };

    FetchComponent(method, message, setIsLoading, setError, setContent);
  }, [selectedGroup, param.id]);

  useEffect(() => {
    if (!title) {
      setTitle(content?.message.entity.resource.articleHeader.descriptor.title);
      setQuestionsArray(content?.message.entity.resource.paragraphs);
    } else {
      setAnswersEntities(content?.message.entities);
    }
  }, [content]);

  useEffect(() => {
    if (title && selectedGroup !== '') {
      const method = `mods/${selectContentType().type}/handlers/${selectContentType().method}`;

      const message = {
        entityRef: { publicId: param.id },
        workgroup: { publicId: selectedGroup },
      };

      FetchComponent(method, message, setIsLoading, setError, setContent);
    }
  }, [selectedGroup, param.id]);

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
      <VStack borderColor="gray.300" borderRadius="lg" borderWidth="1px" paddingY={4}>
        <HStack>
          <WorkgroupSelector setSelectedGroup={setSelectedGroup} />
          <StudentsList
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            studentsArray={answersEntities}
          />
        </HStack>
        <HStack
          alignItems="center"
          justifyContent="space-evenly"
          paddingX="2rem"
          paddingY="2rem"
          spacing={6}
          w="49rem"
        />
        <VStack justifyContent="center" spacing="20px" w="100%">
          {questionsArray?.map((paragraph, index) => (
            <ParagraphList
              key={index}
              answersArray={answersEntities}
              paragraph={paragraph}
              paragraphIndex={index}
              student={selectedStudent}
            />
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export { Stats };
