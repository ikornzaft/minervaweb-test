import React, {useRef} from 'react';
import { VStack, Button } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FaSortUp, FaSortDown } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';


import { EditElementPopover } from './editElementPopover';

const ContentElementMenu = ({
  index,
  paragraphList,
  setParagraphList,
  forceRender,
  setForceRender,
  isImage,
}) => {

  const moveUp = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const element = paragraphList.splice(elementId, 1);
    const removed = paragraphList.splice(elementId - 1, 0, element[0]);
    setForceRender(!forceRender);
  };

  const moveDown = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const element = paragraphList.splice(elementId, 1);
    const removed = paragraphList.splice(+elementId + 1, 0, element[0]);
    setForceRender(!forceRender);
  };

  const delItem = (el) => {
    const elementId = el.currentTarget.id.substr(el.currentTarget.id.length - 1);
    const removed = paragraphList.splice(elementId, 1);
    setForceRender(!forceRender);
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

export { ContentElementMenu };
