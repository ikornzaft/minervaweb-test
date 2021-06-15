import React from 'react';
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { LABELS } from '../../locals/sp/labels';
import { FaQuestion } from 'react-icons/fa';

const ParagraphPopover = ({ header }) => {
  const questionForm = () => (
    <form>
      <Textarea
        fontFamily="Open Sans"
        fontSize="sm"
        backgroundColor="white"
        id="question"
        placeholder={LABELS.ARTICLE.POPOVER.PLACEHOLDER}
      />
      <Button marginY={3} size="sm" variant="primary" type="submit">
        {LABELS.ARTICLE.POPOVER.BUTON_CONTENT}
      </Button>
    </form>
  );

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="sm"
          bg="primary"
          color="white"
          visibility="hidden"
          _groupHover={{ visibility: 'visible' }}
          isRound={true}
          icon={<FaQuestion />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader paddingX={4} fontSize="sm">
          {header}
        </PopoverHeader>
        <PopoverBody textAlign="center">{questionForm()}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { ParagraphPopover };
