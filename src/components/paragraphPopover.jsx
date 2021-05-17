import React from 'react';
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import { FaQuestion } from 'react-icons/fa';

const ParagraphPopover = ({buttonText, header, body}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <IconButton colorScheme="gray" visibility="hidden" _groupHover={{visibility: "visible"}} isRound={true} icon={<FaQuestion />} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{header}</PopoverHeader>
        <PopoverBody>{body}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { ParagraphPopover };
