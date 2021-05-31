import React, { useState } from 'react';
import { Text, Image, Button, HStack } from '@chakra-ui/react';
import { EditElementPopover } from './editElementPopover';

const ArticleContentList = ({ paragraphList, setParagraphList }) => {
  const [forceRender, setForceRender] = useState(true);

  const moveUp = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const element = paragraphList.splice(elementId, 1);
    const removed = paragraphList.splice(elementId - 1, 0, element[0]);
    setForceRender(!forceRender);
  };

  const moveDown = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const element = paragraphList.splice(elementId, 1);
    const removed = paragraphList.splice(+elementId + 1, 0, element[0]);
    setForceRender(!forceRender);
    console.log(paragraphList);

  };

  const delItem = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const removed = paragraphList.splice(elementId, 1);
    setForceRender(!forceRender);
    //setData(data => ({...data, paragraphs: [paragraphsList]}));

  };

  const listItems = (el, index) => {
    if (el.image) {
      return (
        <HStack p={4}>
          <Image w="120px" h="120px" objectFit="cover" src={el.image} />
          <Button id={`btn-up-${index}`} type="button" onClick={moveUp}>
            Subir
          </Button>
          <Button id={`btn-down-${index}`} type="button" onClick={moveDown}>
            Bajar
          </Button>
          <Button id={`btn-delete-${index}`} type="button" onClick={delItem}>
            Eliminar
          </Button>
          <EditElementPopover id={`popover-${index}`} paragraphList={paragraphList} setParagraphList={setParagraphList} elementId={index}/>

        </HStack>
      );
    }
    return (
      <HStack p={4}>
        <Text>{el}</Text>
        <Button id={`btn-up-${index}`} type="button" onClick={moveUp}>
          Subir
        </Button>
        <Button id={`btn-down-${index}`} type="button" onClick={moveDown}>
          Bajar
        </Button>
        <Button id={`btn-delete-${index}`} type="button" onClick={delItem}>
          Eliminar
        </Button>
        <EditElementPopover id={`popover-${index}`} paragraphList={paragraphList} setParagraphList={setParagraphList} elementId={index} />
      </HStack>
    );
  };

  return (
    <div>
      <h1>Contenido</h1>
      {paragraphList.map((el, index) => listItems(el, index))}
    </div>
  );
};

export { ArticleContentList };
