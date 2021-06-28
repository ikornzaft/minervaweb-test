import React, { useEffect } from 'react';
import { HStack, Select, Text } from '@chakra-ui/react';
import { AREAS } from '../../locals/sp/areas';

const AreaSelector = ({newQuizWorkarea, setNewQuizWorkarea, workareaError}) => {
  const options = [
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ];

  return (
    <HStack className="form-control" w="15rem" paddingY={2}>

        <Select borderRadius="md" borderColor={workareaError ? "red" : null} size="sm" placeholder="Elegir la materia" onChange={e => setNewQuizWorkarea(e.target.value)}>
          {options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            );
          })}
        </Select>
        {workareaError ? <Text fontSize="xs" right="100px" color="red" position="absolute">Es necesario seleccionar una materia</Text> : null}

    </HStack>
  );
};

export { AreaSelector };
