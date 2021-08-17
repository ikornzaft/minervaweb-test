import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, Box, Text } from '@chakra-ui/react';

const StudentsList = ({ studentsArray, selectedStudent, setSelectedStudent }) => {
  console.log(studentsArray);

  const [value, setValue] = useState(0);

  const selectRadio = (el) => {
    console.log(el);
    setValue(+el);

    setSelectedStudent(el);
  };

  //Esto se va
  useEffect(() => {
    const newStudent = {
      resource: {
        worker: {
          publicId: 'Pepito',
        },
      },
    };

    studentsArray.push(newStudent);
  }, [studentsArray, value]);
  //Hasta acá

  return (
    <div>
      {studentsArray.map((el, index) => (
        <RadioGroup key={index} value={value} w="100%" onChange={selectRadio}>
          <Box _hover={{ bg: 'gray.200' }} paddingX={6} paddingY={2} w="238px">
            <Radio borderColor="gray.400" value={index} w="100%">
              <Box w="100%">
                <Text>{el.resource.worker.title}</Text>
              </Box>
            </Radio>
          </Box>
        </RadioGroup>
      ))}
    </div>
  );
};

export { StudentsList };
