import React from 'react';
import { VStack, Button } from '@chakra-ui/react';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';


import { EditElementPopover } from './editElementPopover';

const ArticleContentElementMenu = ({
  index,
  paragraphList,
  setParagraphList,
  forceRender,
  setForceRender,
  isImage,
}) => {

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
      <EditElementPopover
        id={`popover-${index}`}
        paragraphList={paragraphList}
        setParagraphList={setParagraphList}
        elementId={index}
        forceRender={forceRender}
        setForceRender={setForceRender}
        isImage={isImage}
      />
      <Button
        size="xs"
        type="button"
        id={`btn-delete-${index}`}
        onClick={delItem}
      >{<FaRegTrashAlt />}</Button>
      <Button
        size="xs"
        type="button"
        id={`btn-down-${index}`}
        onClick={moveDown}
        boxShadow='none !important'
        isDisabled={index === paragraphList.length - 1 ? true : false}
      >{<FaSortDown />}</Button>
    </VStack>
  );
};

export { ArticleContentElementMenu };
