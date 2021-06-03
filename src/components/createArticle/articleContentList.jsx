import React, { useState } from 'react';
import { Text, Image, Button, HStack, Box } from '@chakra-ui/react';

import { EditElementPopover } from './editElementPopover';
import { ArticleContentElementMenu } from './articleContentElementMenu';

const ArticleContentList = ({ paragraphList, setParagraphList }) => {
  const [forceRender, setForceRender] = useState(true);

  const moveUp = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const element = paragraphList.splice(elementId, 1);
    const removed = paragraphList.splice(elementId - 1, 0, element[0]);
  };

  const moveDown = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const element = paragraphList.splice(elementId, 1);
    const removed = paragraphList.splice(+elementId + 1, 0, element[0]);
  };

  const delItem = (el) => {
    const elementId = el.target.id.substr(el.target.id.length - 1);
    const removed = paragraphList.splice(elementId, 1);
  };

  const listItems = (el, index) => {
    if (el.image && el.image !== '') {
      return (
        <HStack p={3} bgColor="gray.100" borderRadius="md" marginBottom={2}>
          <Image
            w="80px"
            h="80px"
            objectFit="cover"
            borderRadius="md"
            src={el.image}
          />
          <p>{index}</p>
          <ArticleContentElementMenu
            index={index}
            paragraphList={paragraphList}
            setParagraphList={setParagraphList}
            forceRender={forceRender}
            setForceRender={setForceRender}
          />
        </HStack>
      );
    }
    if (el == '' || el.image == '') return null;
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
        <EditElementPopover
          id={`popover-${index}`}
          paragraphList={paragraphList}
          setParagraphList={setParagraphList}
          elementId={index}
        />
      </HStack>
    );
  };

  return (
    <Box paddingTop={2}>
      {paragraphList.map((el, index) => listItems(el, index))}
    </Box>
  );
};

export { ArticleContentList };
