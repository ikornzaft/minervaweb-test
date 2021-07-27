import React, {useState, useEffect} from 'react';
import { VStack, Button, useDisclosure } from '@chakra-ui/react';
import { ExamQuestionsForm } from './examQuestionsForm';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';


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

  const moveUp = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const newArray = [...paragraphList]
    const element = newArray.splice(elementId, 1);
    const removed = newArray.splice(elementId - 1, 0, element[0]);
    setParagraphList(newArray)
  };

  const moveDown = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const newArray = [...paragraphList]
    const element = newArray.splice(elementId, 1);
    const removed = newArray.splice(+elementId + 1, 0, element[0]);
    setParagraphList(newArray)
  };

  const delItem = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const newArray = [...paragraphList]
    const removed = newArray.splice(elementId, 1);
    setParagraphList(newArray)
  };

  const editItem = (el) => {
    if (paragraphList[index].content.link) setPrevImage({location: paragraphList[index].content.link.location});
    setPrevQuestion(paragraphList[index].descriptor.title);
    const answers = paragraphList[index].content.options.map(el => el.descriptor.title) 
    const trueAnswer = paragraphList[index].content.options.findIndex(el => el.answer === true)
    setPrevAnswers(answers);
    setTruePrevAnswer(trueAnswer)
    onOpenEditQuestion();
  };

  const changeQuestionsArray = (newEntry) => {
    const newParagraphArray = [...paragraphList]
    newParagraphArray.splice(index, 1, newEntry);
    setParagraphList(newParagraphArray);
  }

  return (
    <VStack heigth="100%">
      <Button
        size="xs"
        type="button"
        id={`btn-up-${index}`}
        onClick={moveUp}
        isDisabled={index < 1 ? true : false}
        boxShadow='none !important'

      >{<FaSortUp />}</Button>
      <Button
        size="xs"
        type="button"
        id={`btn-delete-${index}`}
        onClick={delItem}
      >{<FaRegTrashAlt />}</Button>
      <Button
      size="xs"
      type="button"
      id={`btn-edit-${index}`}
      onClick={editItem}
    >{<FaEdit />}</Button>
      <Button
        size="xs"
        type="button"
        id={`btn-down-${index}`}
        onClick={moveDown}
        boxShadow='none !important'
        isDisabled={index === paragraphList.length - 1 ? true : false}
      >{<FaSortDown />}</Button>
      <ExamQuestionsForm
      isOpen={isOpenEditQuestion}
      onClose={onCloseEditQuestion}
      modalTitle="Editar pregunta"
      examQuestionsArray={paragraphList}
      changeQuestionsArray={changeQuestionsArray}
      prevImage={prevImage}
      prevQuestion={prevQuestion}
      prevAnswers={prevAnswers}
      truePrevAnswer={truePrevAnswer}
      buttonText='Confirmar cambios'
    />
    </VStack>
  );
};

export { ElementMenu };
