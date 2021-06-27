import React from 'react';
import { Text, Box, Image, VStack } from '@chakra-ui/react';
import { ParagraphReducer } from '../../common/paragraphReducer';
import { RiVideoLine } from 'react-icons/ri';
import { VscFile, VscLinkExternal } from 'react-icons/vsc';
import { FiSpeaker } from 'react-icons/fi';

const ArticleContentItem = ({ descriptor, content }) => {
  const displayText = () => {
    return (
      <Text textAlign="left">{ParagraphReducer(descriptor.description)}</Text>
    );
  };

  const displayContent = () => {
    let icon;
    if (content.type === 'document') {
      icon = VscFile;
    } else if (content.type === 'audio') {
      icon = FiSpeaker;
    } else if (content.type === 'video') {
      icon = RiVideoLine;
    } else if (content.type === 'link') {
      icon = VscLinkExternal;
    }

    console.log(descriptor, content);

    return (
      <>
        <Box>
          {content.type === 'image' ? (
            <Image
              boxSize="100px"
              objectFit="cover"
              borderColor="gray.400"
              borderRadius="lg"
              borderWidth="2px"
              src={`http://www.afatecha.com/id/files/image/${content.location}`}
            />
          ) : (
            <Box
              as={icon}
              alignSelf="center"
              w="80px"
              h="80px"
              p={2}
              color="gray.600"
            />
          )}
        </Box>
        <Box>
          <VStack>
            <Text>{descriptor.title}</Text>
          </VStack>
        </Box>
      </>
    );
  };

  return <>{content ? displayContent() : displayText()}</>;
};

export { ArticleContentItem };
