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
        bgColor="gray.100"
        borderRadius="md"
        justifyContent="space-between"
        marginBottom={2}
        maxWidth="30rem"
        minWidth="30rem"
        paddingX={6}
        paddingY={2}
        width="30rem"
      >
        <ArticleContentItem content={content} descriptor={descriptor} />
        <ArticleContentElementMenu
          forceRender={forceRender}
          index={index}
          isImage="false"
          paragraphList={paragraphList}
          setForceRender={setForceRender}
          setParagraphList={setParagraphList}
        />
      </HStack>
    );
  };

  return <Box paddingTop={2}>{paragraphList.map((el, index) => listItems(el, index))}</Box>;
};

export { ArticleContentList };
