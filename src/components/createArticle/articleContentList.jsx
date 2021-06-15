import React, { useState } from 'react';
import { Text, Image, HStack, Box } from '@chakra-ui/react';
import { ParagraphReducer } from '../common/paragraphReducer';

import { ArticleContentElementMenu } from './articleContentElementMenu';

const ArticleContentList = ({ paragraphList, setParagraphList }) => {
  const [forceRender, setForceRender] = useState(true);

  const listItems = (el, index) => {
    if (el.image && el.image !== '') {
      return (
        <HStack
          width="30rem"
          maxWidth="30rem"
          minWidth="30rem"
          p={3}
          bgColor="gray.100"
          borderRadius="md"
          marginBottom={2}
          justifyContent="space-between"
        >
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
            isImage="true"
          />
        </HStack>
      );
    }
    if (el === '' || el.image === '') return null;
    return (
      <HStack
      width="30rem"
      maxWidth="30rem"
      minWidth="30rem"
        p={3}
        bgColor="gray.100"
        borderRadius="md"
        marginBottom={2}
        justifyContent="space-between"
      >
        <Text textAlign="left">{ParagraphReducer(el)}</Text>
        <ArticleContentElementMenu
          index={index}
          paragraphList={paragraphList}
          setParagraphList={setParagraphList}
          forceRender={forceRender}
          setForceRender={setForceRender}
          isImage="false"
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
