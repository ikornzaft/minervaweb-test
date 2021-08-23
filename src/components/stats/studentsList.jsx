import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, Box, Text, Select } from '@chakra-ui/react';

const StudentsList = ({ studentsArray, selectedStudent, setSelectedStudent }) => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Box>
        <Select
          borderRadius="md"
          size="sm"
          w="13rem"
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          {studentsArray?.map((el, index) => {
            return (
              <option key={index} value={index}>
                {el.resource.worker.title}
              </option>
            );
          })}
        </Select>
      </Box>
    </div>
  );
};

export { StudentsList };
