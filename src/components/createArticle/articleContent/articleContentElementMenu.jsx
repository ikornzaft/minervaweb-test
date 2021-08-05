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
      <EditElementPopover
        elementId={index}
        forceRender={forceRender}
        id={`popover-${index}`}
        isImage={isImage}
        paragraphList={paragraphList}
        setForceRender={setForceRender}
        setParagraphList={setParagraphList}
      />
      <Button id={`btn-delete-${index}`} size="xs" type="button" onClick={delItem}>
        {<FaRegTrashAlt />}
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
    </VStack>
  );
};

export { ArticleContentElementMenu };
