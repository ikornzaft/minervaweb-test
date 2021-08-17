import React, { useState } from 'react';
import { Select, Box } from '@chakra-ui/react';

const WorkgroupSelector = ({ isOpen, onClose, setSelectedGroup }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const groups = JSON.parse(localStorage.getItem('workgroups'));
  const filteredGroups = groups.filter((el) => !el.resource.private);

  return (
    <Box>
      <Select
        autoFocus={true}
        borderRadius="md"
        placeholder="Seleccionar grupo"
        size="sm"
        w="13rem"
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        {filteredGroups.map((option) => {
          return (
            <option key={option.resource.descriptor.title} value={option.header.privateId}>
              {option.resource.descriptor.title}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export { WorkgroupSelector };
