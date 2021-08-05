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
        closeOnBlur={false}
        initialFocusRef={firstFieldRef}
        isOpen={isOpen}
        placement="left"
        variant="extraheight"
        onClose={onClose}
        onOpen={onOpen}
      >
        <PopoverTrigger>
          <IconButton icon={<FaEdit />} size="xs" />
        </PopoverTrigger>
        <PopoverContent height="100%" paddingY={4} width="100%">
          <PopoverArrow />

          <EditElementForm
            elementId={elementId}
            forceRender={forceRender}
            isImage={isImage}
            paragraphList={paragraphList}
            setForceRender={setForceRender}
            setParagraphList={setParagraphList}
            onCancel={onClose}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export { EditElementPopover };
