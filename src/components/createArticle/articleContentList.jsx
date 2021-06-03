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

  const cutParagraph = (el) => {
    const paragArray = el.split(' ');
    const smallParag = paragArray.splice(0, 25).join(' ');
    console.log(smallParag);
    return smallParag + ' (...)';
  }

  const listItems = (el, index) => {
    if (el.image && el.image !== '') {
      return (
        <HStack width="98%" p={3} bgColor="gray.100" borderRadius="md" marginBottom={2} justifyContent="space-between">
        <HStack width="100%" justifyContent="center">
        <Image
            w="110px"
            h="110px"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.400"
            objectFit="cover"
            borderRadius="md"
            src={el.image}
          />
        </HStack>  
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
      <HStack width="98%" p={3} bgColor="gray.100" borderRadius="md" marginBottom={2} justifyContent="space-between">
        <Text textAlign="left">{cutParagraph(el)}</Text>
        <ArticleContentElementMenu
          index={index}
          paragraphList={paragraphList}
          setParagraphList={setParagraphList}
          forceRender={forceRender}
          setForceRender={setForceRender}
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
