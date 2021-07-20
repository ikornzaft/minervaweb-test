import React, {useState, useEffect} from 'react';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';


const HomeworksSelector = ({
  workAreas,
  selectedHomeworks,
  setSelectedHomeworks,
}) => {
  const [homeworks, setHomeworks] = useState([]);
  const [homeworksToDisplay, setHomeworksToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArea, setSelectedArea] = useState([]);
  const [optionValue, setOptionValue] = useState("");

  useEffect(() => {
    setHomeworksToDisplay([]);
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
        method: 'mods/homeworks/handlers/FindHomeworks',
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
        console.log(resJson);
        setHomeworks(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [setHomeworksToDisplay, selectedArea])


  useEffect(() => {
    homeworks.map((homework) => {
      const newHomeworkToDisplay = {
        key: homeworks.entity.publicId,
        value: homework.contentHeader.descriptor.title,
      };
      setHomeworksToDisplay((prevHomeworks) => [
        ...prevHomeworks,
        newHomeworkToDisplay,
      ]);
    });
  }, [homeworks]);

  const addHomework = () => {
    const homeworkIndex = homeworks.findIndex(
      (option) => option.entity.publicId === optionValue
    );
    if (homeworkIndex !== -1) {
      const homeworkObj = {
        descriptor: {
          title: homeworks[homeworkIndex].contentHeader.descriptor.title,
          subtitle: homeworks[homeworkIndex].contentHeader.descriptor.subtitle,
        },

      };
      const elementExists = selectedHomeworks.findIndex(
        (el) => el.homework.entity.publicId === optionValue
      );
      if (elementExists === -1)
        setSelectedHomeworks([...selectedHomeworks, homeworkObj]);
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
          placeholder="Selecciona una tarea"
          onChange={(e) => {
            setOptionValue(e.target.value);
          }}
        >
          {homeworksToDisplay.map((option) => {
            return (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            );
          })}
        </Select>
        <Button
          type="button"
          w="10rem"
          variant="outline"
          fontFamily="Poppins"
          fontWeight="400"
          bgColor="white"
          colorScheme="blue"
          size="sm"
          onClick={addHomework}
        >
          Agregar artículo
        </Button>
      </HStack>
</VStack>
  )
};

export { HomeworksSelector };
