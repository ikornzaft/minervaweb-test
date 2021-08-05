import React, { useState, useEffect } from 'react';
import { VStack, Button, useDisclosure } from '@chakra-ui/react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

import { QuizQuestionsForm } from './quizQuestionsForm';

const ElementMenu = ({
  index,
  paragraphList,
  setParagraphList,
  forceRender,
  setForceRender,
  isImage,
}) => {
  const {
    isOpen: isOpenEditQuestion,
    onOpen: onOpenEditQuestion,
    onClose: onCloseEditQuestion,
  } = useDisclosure();

  const [prevImage, setPrevImage] = useState(null);
  const [prevQuestion, setPrevQuestion] = useState('');
  const [prevAnswers, setPrevAnswers] = useState([]);
  const [truePrevAnswer, setTruePrevAnswer] = useState(0);

  useEffect(() => {}, []);

  const moveUp = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const newArray = [...paragraphList];
    const element = newArray.splice(elementId, 1);
    const removed = newArray.splice(elementId - 1, 0, element[0]);

    setParagraphList(newArray);
  };

  const moveDown = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const newArray = [...paragraphList];
    const element = newArray.splice(elementId, 1);
    const removed = newArray.splice(+elementId + 1, 0, element[0]);

    setParagraphList(newArray);
  };

  const delItem = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const newArray = [...paragraphList];
    const removed = newArray.splice(elementId, 1);

    setParagraphList(newArray);
  };

  const editItem = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);

    if (paragraphList[index].content.link)
      setPrevImage({ location: paragraphList[index].content.link.location });
    setPrevQuestion(paragraphList[index].descriptor.title);
    console.log(paragraphList[index].content.options);
    const answers = paragraphList[index].content.options.map((el) => el.descriptor.title);
    const trueAnswer = paragraphList[index].content.options.findIndex((el) => el.answer === true);

    console.log(trueAnswer, answers);
    setPrevAnswers(answers);
    setTruePrevAnswer(trueAnswer);
    onOpenEditQuestion();
  };

  const changeQuestionsArray = (newEntry) => {
    console.log(newEntry);
    const newParagraphArray = [...paragraphList];

    newParagraphArray.splice(index, 1, newEntry);
    console.log(newParagraphArray);
    setParagraphList(newParagraphArray);
  };

  return (
    <VStack heigth="100%">
      <Button
        boxShadow="none !important"
        id={`btn-up-${index}`}
        isDisabled={index < 1 ? true : false}
        size="xs"
        type="button"
        onClick={moveUp}
      >
        {<FaSortUp />}
      </Button>
      <Button id={`btn-delete-${index}`} size="xs" type="button" onClick={delItem}>
        {<FaRegTrashAlt />}
      </Button>
      <Button id={`btn-edit-${index}`} size="xs" type="button" onClick={editItem}>
        {<FaEdit />}
      </Button>
      <Button
        boxShadow="none !important"
        id={`btn-down-${index}`}
        isDisabled={index === paragraphList.length - 1 ? true : false}
        size="xs"
        type="button"
        onClick={moveDown}
      >
        {<FaSortDown />}
      </Button>
      <QuizQuestionsForm
        buttonText="Confirmar cambios"
        changeQuestionsArray={changeQuestionsArray}
        isOpen={isOpenEditQuestion}
        modalTitle="Editar pregunta"
        prevAnswers={prevAnswers}
        prevImage={prevImage}
        prevQuestion={prevQuestion}
        quizQuestionsArray={paragraphList}
        truePrevAnswer={truePrevAnswer}
        onClose={onCloseEditQuestion}
      />
    </VStack>
  );
};

export { ElementMenu };
