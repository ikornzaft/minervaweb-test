import React, { useRef } from 'react';
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

const EditElementPopover = ({paragraphList, setParagraphList, elementId}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);
  console.log(paragraphList, elementId);

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
        <EditElementForm prevValue={paragraphList[elementId]} firstFieldRef={firstFieldRef} onCancel={onClose} />
        </PopoverContent>
      </Popover>
    </>
  );
};

export { EditElementPopover };
