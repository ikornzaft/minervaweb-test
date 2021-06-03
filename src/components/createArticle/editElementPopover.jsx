import React, { useRef } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';

import { FaEdit } from 'react-icons/fa';
import { EditElementForm } from './editElementForm';

const EditElementPopover = ({
  paragraphList,
  setParagraphList,
  elementId,
  forceRender,
  setForceRender,
  isImage,
}) => {
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
          <IconButton size="xs" icon={<FaEdit />} />
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
              isImage={isImage}
            />
          
        </PopoverContent>
      </Popover>
    </>
  );
};

export { EditElementPopover };
