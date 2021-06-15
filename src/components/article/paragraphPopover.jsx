import React, { useState, useRef } from 'react';
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
const ParagraphPopover = ({ header, paragraphId, articleId, requests, setRequests }) => {
  const [question, setQuestion] = useState({});
  const initialFocusRef = useRef();

  const handleChange = (e) => {
    const newRequest = {
      'request': e.target.value,
      'paragraph': paragraphId,
      'article': articleId,
    }
    setQuestion(newRequest);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(question);
    setRequests((requests) => [...requests, question]);
  }

  const questionForm = ({onClose}) => (
    <form onSubmit={handleSubmit}>
      <Textarea
        ref={initialFocusRef}
        fontFamily="Open Sans"
        fontSize="sm"
        backgroundColor="white"
        id="question"
        name="question"
        onChange={handleChange}
        placeholder={LABELS.ARTICLE.POPOVER.PLACEHOLDER}
      />
      <Button marginY={3} size="sm" variant="primary" type="submit" onClick={onClose}>
        {LABELS.ARTICLE.POPOVER.BUTON_CONTENT}
      </Button>
    </form>
  );

  return (
    <Popover initialFocusRef={initialFocusRef}>
      {({ isOpen, onClose}) => (
        <>
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
          <PopoverBody textAlign="center">{questionForm(onClose={onClose})}</PopoverBody>
        </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export { ParagraphPopover };
