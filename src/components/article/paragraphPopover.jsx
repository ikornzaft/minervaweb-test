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
import { FaQuestion } from 'react-icons/fa';

const ParagraphPopover = ({ buttonText, header, body }) => {
  const questionForm = () => (
    <form >
      <Textarea
        fontFamily="Open Sans"
        fontSize="sm"
        backgroundColor="white"
        id="question"
        placeholder="Ingresa tu consulta"
      />
      <Button
        marginY={3}
        size="sm"
        fontFamily="Poppins"
        fontWeight="400"
        colorScheme="blue"
        type="submit"
      >
        Enviar consulta
      </Button>
    </form>
  );

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          size="sm"
          colorScheme="blue"
          visibility="hidden"
          _groupHover={{ visibility: 'visible' }}
          isRound={true}
          icon={<FaQuestion />}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader paddingX={4} fontFamily="Open Sans" fontSize="sm">
          {header}
        </PopoverHeader>
        <PopoverBody textAlign="center">{questionForm()}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { ParagraphPopover };
