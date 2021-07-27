import React, { useState, useEffect } from 'react';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';
import { DisplayExam } from './displayExam';

const ExamsSelector = ({
  workAreas,
  selectedExams,
  setSelectedExams,
}) => {
  const [exams, setExams] = useState([]);
  const [examsToDisplay, setExamsToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState([]);
  const [optionValue, setOptionValue] = useState('');

  useEffect(() => {
    setExamsToDisplay([]);
    console.log(selectedArea)
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
        method: 'mods/exams/handlers/FindExams',
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
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        console.log(resJson)
        setExams(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [setExamsToDisplay, selectedArea]);

  useEffect(() => {
    exams.map((exam) => {
      const newExamToDisplay = {
        key: exam.entity.publicId,
        value: exam.contentHeader.descriptor.title,
      };
      setExamsToDisplay((prevExams) => [...prevExams, newExamToDisplay]);
    });
  }, [exams]);

  const addExam = () => {
    const examIndex = exams.findIndex(
      (option) => option.entity.publicId === optionValue
    );
    if (examIndex !== -1) {
      const examObj = {
        descriptor: {
          title: exams[examIndex].contentHeader.descriptor.title,
          subtitle: exams[examIndex].contentHeader.descriptor.subtitle,
        },
        content: {
          type: 'exam',
          entity: {
            publicId: optionValue,
          },
        },
      };

      const elementExists = selectedExams.findIndex(
        (el) => el.content.entity.publicId === optionValue
      );
      if (elementExists === -1)
        setSelectedExams([...selectedExams, examObj]);
    }
    setOptionValue(null);
  };

  return (
    <VStack paddingTop={2}>
      <Select
        w="12rem"
        borderRadius="md"
        size="sm"
        placeholder="Elige la materia"
        autoFocus={true}
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
          w="20rem"
          size="sm"
          placeholder="Selecciona un examen"
          onChange={(e) => {
            setOptionValue(e.target.value);
          }}
        >
          {examsToDisplay.map((option) => {
            return (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            );
          })}
        </Select>
        <Button
          type="button"
          w="12rem"
          variant="outline"
          fontFamily="Poppins"
          fontWeight="400"
          bgColor="white"
          colorScheme="blue"
          size="sm"
          onClick={addExam}
        >
          Agregar examen
        </Button>
      </HStack>
      {selectedExams.map((exam) => {
        if (exam !== '')
          return (
            <DisplayExam
              options={exams}
              selectedExams={selectedExams}
              setSelectedExams={setSelectedExams}
              exam={exam}
            />
          );
      })}
    </VStack>
  );
};

export { ExamsSelector };
