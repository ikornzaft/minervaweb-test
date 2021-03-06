import React, { useState, useEffect } from 'react';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';

import { DisplayQuiz } from './displayQuiz';

const QuizzesSelector = ({ workAreas, selectedQuizzes, setSelectedQuizzes }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [quizzesToDisplay, setQuizzesToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState([]);
  const [optionValue, setOptionValue] = useState('');

  useEffect(() => {
    setQuizzesToDisplay([]);
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/quizzes/handlers/FindQuizzes',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {
          workarea: {
            publicId: selectedArea,
          },
          workgroups: workgroups,
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        setQuizzes(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [setQuizzesToDisplay, selectedArea]);

  useEffect(() => {
    quizzes.map((quiz) => {
      const newQuizToDisplay = {
        key: quiz.entity.publicId,
        value: quiz.contentHeader.descriptor.title,
      };

      setQuizzesToDisplay((prevQuizzes) => [...prevQuizzes, newQuizToDisplay]);
    });
  }, [quizzes]);

  const addQuiz = () => {
    const quizIndex = quizzes.findIndex((option) => option.entity.publicId === optionValue);

    if (quizIndex !== -1) {
      const quizObj = {
        descriptor: {
          title: quizzes[quizIndex].contentHeader.descriptor.title,
          subtitle: quizzes[quizIndex].contentHeader.descriptor.subtitle,
        },
        content: {
          type: 'quiz',
          entity: {
            publicId: optionValue,
          },
        },
      };

      const elementExists = selectedQuizzes.findIndex(
        (el) => el.content.entity.publicId === optionValue
      );

      if (elementExists === -1) setSelectedQuizzes([...selectedQuizzes, quizObj]);
    }
    setOptionValue(null);
  };

  return (
    <VStack paddingTop={2}>
      <Select
        autoFocus={true}
        borderRadius="md"
        placeholder="Elige la materia"
        size="sm"
        w="12rem"
        onChange={(e) => {
          setSelectedArea(e.target.value);
        }}
      >
        {workAreas.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Select>
      <HStack className="form-control" paddingY={4}>
        <Select
          borderRadius="md"
          placeholder="Selecciona una autoevaluaci??n"
          size="sm"
          w="20rem"
          onChange={(e) => {
            setOptionValue(e.target.value);
          }}
        >
          {quizzesToDisplay.map((option) => {
            return (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            );
          })}
        </Select>
        <Button
          bgColor="white"
          colorScheme="blue"
          fontFamily="Poppins"
          fontWeight="400"
          size="sm"
          type="button"
          variant="outline"
          w="12rem"
          onClick={addQuiz}
        >
          Agregar autoevaluaci??n
        </Button>
      </HStack>
      {selectedQuizzes.map((quiz) => {
        if (quiz !== '')
          return (
            <DisplayQuiz
              options={quizzes}
              quiz={quiz}
              selectedQuizzes={selectedQuizzes}
              setSelectedQuizzes={setSelectedQuizzes}
            />
          );
      })}
    </VStack>
  );
};

export { QuizzesSelector };
