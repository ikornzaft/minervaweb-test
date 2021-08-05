import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Stack, Box, Spinner, VStack } from '@chakra-ui/react';

import { ExamContent } from '../components/exam/examContent';

const Loader = () => (
  <Box height="50vh" paddingTop={24}>
    <Spinner color="blue.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="4px" />
  </Box>
);

const Exam = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef();
  const param = useParams();
  const [article, setArticle] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [paragraphs, setParagraphs] = useState([]);
  const [workarea, setWorkarea] = useState('');
  const [date, setDate] = useState('');

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
        method: 'mods/exams/handlers/GetExam',
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

        console.log(resJson);
        setTitle(resJson.message.entity.resource.articleHeader.descriptor.title);
        setSubtitle(resJson.message.entity.resource.articleHeader.descriptor.subtitle);
        setParagraphs(resJson.message.entity.resource.paragraphs);
        setWorkarea(resJson.message.entity.resource.workarea.publicId);
        setDate(resJson.message.entity.logs.inserted.timestamp);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [param.id]);

  const { pathname } = useLocation();

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return (
    <Stack ref={containerRef} alignItems="center" marginTop={4} paddingBottom={6}>
      {isLoading ? (
        <Loader />
      ) : (
        <ExamContent
          date={date}
          paragraphs={paragraphs}
          subtitle={subtitle}
          title={title}
          workarea={workarea}
        />
      )}
    </Stack>
  );
};

export { Exam };
