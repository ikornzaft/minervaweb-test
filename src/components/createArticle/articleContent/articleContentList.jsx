import React, { useState } from 'react';
import { Text, Image, HStack, Box } from '@chakra-ui/react';
import { ParagraphReducer } from '../../common/paragraphReducer';

import { ArticleContentItem } from './articleContentItem';
import { ArticleContentElementMenu } from './articleContentElementMenu';

const ArticleContentList = ({ paragraphList, setParagraphList }) => {
  const [forceRender, setForceRender] = useState(true);

  const listItems = (el, index) => {
    const descriptor = el.descriptor;
    let content;
    el.content ? (content = el.content) : (content = null);
    return (
      <HStack
        key={index}
        width="30rem"
        maxWidth="30rem"
        minWidth="30rem"
        paddingY={2}
        paddingX={6}
        bgColor="gray.100"
        borderRadius="md"
        marginBottom={2}
        justifyContent="space-between"
      >
        <ArticleContentItem descriptor={descriptor} content={content} />
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
