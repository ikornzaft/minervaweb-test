import React, { useState, useRef } from 'react';
import { Text, Image, Button, HStack } from '@chakra-ui/react';

const ArticleContentList = ({ data, setData }) => {
  const [forceRender, setForceRender] = useState(true);

  const paragraphsList = data.paragraphs;

  const moveUp = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const element = paragraphsList.splice(elementId, 1);
    const removed = paragraphsList.splice((elementId - 1), 0, element[0]);
    setForceRender(!forceRender);
  };

  const moveDown = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const element = paragraphsList.splice(elementId, 1);
    const removed = paragraphsList.splice((+elementId + 1), 0, element[0]);
    setForceRender(!forceRender);
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
      </HStack>
    );
  };

  return (
    <div>
      <h1>Contenido</h1>
      {paragraphsList.map((el, index) => listItems(el, index))}
    </div>
  );
};

export { ArticleContentList };
