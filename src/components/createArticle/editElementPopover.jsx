import React, { useState, useRef } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  FocusLock,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Box,
  IconButton,
  EditIcon,
} from '@chakra-ui/react';

import { FaEdit } from 'react-icons/fa';
import { EditElementForm } from './editElementForm';

const EditElementPopover = ({ paragraphList, setParagraphList, elementId, forceRender, setForceRender }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const firstFieldRef = useRef(null);

  return (
    <>
      <Popover
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="left"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon={<FaEdit />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <PopoverArrow />
          <PopoverCloseButton />
          <EditElementForm
            paragraphList={paragraphList}
            elementId={elementId}
            setParagraphList={setParagraphList}
            onCancel={onClose}
            forceRender={forceRender} 
            setForceRender={setForceRender}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export { EditElementPopover };
