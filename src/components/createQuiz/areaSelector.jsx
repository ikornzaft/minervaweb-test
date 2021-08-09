import React, { useEffect } from 'react';
import { HStack, Select, Text } from '@chakra-ui/react';

import { AREAS } from '../../locals/sp/areas';

const AreaSelector = ({ newQuizWorkarea, setNewQuizWorkarea, workareaError }) => {
  const options = [
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ];

  return (
    <HStack className="form-control" paddingY={2} w="15rem">
      <Select
        borderColor={workareaError ? 'red' : null}
        borderRadius="md"
        placeholder="Elegir la materia"
        size="sm"
        onChange={(e) => setNewQuizWorkarea(e.target.value)}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Select>
      {workareaError ? (
        <Text color="red" fontSize="xs" position="absolute" right="100px">
          Es necesario seleccionar una materia
        </Text>
      ) : null}
    </HStack>
  );
};

export { AreaSelector };
