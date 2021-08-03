import React from 'react';
import { Text, Box, Image, VStack } from '@chakra-ui/react';
import { ParagraphReducer } from '../../common/paragraphReducer';
import { RiVideoLine } from 'react-icons/ri';
import { VscFile, VscLinkExternal } from 'react-icons/vsc';
import { FiSpeaker } from 'react-icons/fi';

const ArticleContentItem = ({ descriptor, content }) => {
  const displayText = () => {
    return (
      <Text fontSize="sm" textAlign="left">
        {ParagraphReducer(descriptor.description)}
      </Text>
    );
  };
  const displayContent = () => {
    let icon;
    if (content.link.type === 'document') {
      icon = VscFile;
    } else if (content.link.type === 'audio') {
      icon = FiSpeaker;
    } else if (content.link.type === 'video') {
      icon = RiVideoLine;
    } else if (content.link.type === 'link') {
      icon = VscLinkExternal;
    }
    return (
      <>
        <Box>
          {content.link.type === 'image' ? (
            <Image
              boxSize="100px"
              objectFit="cover"
              borderColor="gray.400"
              borderRadius="lg"
              borderWidth="2px"
              src={`http://www.afatecha.com/id/files/image/${content.link.location}`}
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
            <Text fontSize="sm">{descriptor.title}</Text>
          </VStack>
        </Box>
      </>
    );
  };

  return <>{content ? displayContent() : displayText()}</>;
};

export { ArticleContentItem };
