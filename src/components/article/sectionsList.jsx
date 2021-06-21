import React from 'react';
import { Link } from 'react-router-dom';
import {
  VStack,
  HStack,
  Heading,
  Text,
  Stack,
  Box,
  Image,
} from '@chakra-ui/react';
import { SectionItem } from './sectionItem';
import { ParagraphReducer } from '../common/paragraphReducer';
import { ArticlesDb} from '../../resources/articlesDb';
import { FaRegLightbulb } from 'react-icons/fa';
import { FaRegFile } from 'react-icons/fa';
import quizIcon from '../../assets/images/quiz.svg';

const SectionsList = ({ sections }) => {

  const displayRelatedArticles = (articles) => {
    let articlesHeading = null;
    let articlesForDisplay = null;
    if (articles.length > 0) {
      const getRelatedArticleData = (article) => {
        const relatedArticleId = ArticlesDb.findIndex(el => el.header.publicId === article.descriptor.articleId);
        const title = ArticlesDb[relatedArticleId].resource.articleHeader.descriptor.title;
        const subtitle = ArticlesDb[relatedArticleId].resource.articleHeader.descriptor.subtitle;
        const publicId = ArticlesDb[relatedArticleId].header.publicId;
        return {title, subtitle, publicId};
      };
      articlesHeading = 
        <HStack textAlign="left" justifyContent="flex-start" w="40rem">
          <Heading
            fontFamily="Poppins"
            fontSize="sm"
            color="gray.600"
            fontWeight="400"
          >
            ARTÍCULOS RELACIONADOS
          </Heading>
        </HStack>
      
      articlesForDisplay = articles.map((el) => (
        <Link to={`/article/${getRelatedArticleData(el).publicId}`}>
          <Stack
            width="40rem"
            height="5.5rem"
            bgColor="white"
            borderRadius="lg"
            justifyContent="flex-start"
            alignItems="flex-start"
            direction="row"
            overflow="hidden"
            borderStyle="solid"
            borderWidth="1px"
            maxHeight="100px"
            _hover={{ bg: 'gray.100' }}
          >
            <Box as={FaRegLightbulb} alignSelf="center" w="70px" h="70px" p={2} color="gray.600" />
            <Stack width="100%" justifyContent="flex-start">
              <Stack
                width="100%"
                direction="row"
                alignItems="center"
                paddingX={4}
              >
                <Stack paddingTop={3} alignItems="flex-start" spacing="1">
                  <Heading
                    as="h3"
                    size="sm"
                    marginLeft={0}
                    lineHeight="0.7rem"
                    fontFamily="Open Sans"
                  >
                    {getRelatedArticleData(el).title}
                  </Heading>
                  <Box textAlign="left" marginTop="0" paddingLeft={0}>
                    <Text
                      as="h5"
                      fontSize="xs"
                      fontFamily="Open Sans"
                      fontWeight="400"
                    >
                    {ParagraphReducer(getRelatedArticleData(el).subtitle)}
                    </Text>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </ Link>
      ));
    }
    return [articlesHeading, articlesForDisplay];
  };


  const displayKnowMore = (files) => {
    console.log(files)
    let filesHeading = null;
    let filesForDisplay = null;
    if (files.length > 0) {
      filesHeading = 
        <HStack textAlign="left" justifyContent="flex-start" w="40rem">
          <Heading
            fontFamily="Poppins"
            fontSize="sm"
            color="gray.600"
            fontWeight="400"
          >
            PARA SABER MÁS
          </Heading>
        </HStack>
      
      filesForDisplay = files.map((el) => (
        <Link to={''}>
          <Stack
            width="40rem"
            height="5.5rem"
            bgColor="white"
            borderRadius="lg"
            justifyContent="flex-start"
            alignItems="flex-start"
            direction="row"
            overflow="hidden"
            borderStyle="solid"
            borderWidth="1px"
            maxHeight="100px"
            _hover={{ bg: 'gray.100' }}
          >
          <Box as={FaRegFile} alignSelf="center" w="70px" h="70px" p={2} color="gray.600" />

            <Stack width="100%" justifyContent="flex-start">
              <Stack
                width="100%"
                direction="row"
                alignItems="center"
                paddingX={4}
              >
                <Stack paddingTop={3} alignItems="flex-start" spacing="1">
                  <Heading
                    as="h3"
                    size="sm"
                    marginLeft={0}
                    lineHeight="0.7rem"
                    fontFamily="Open Sans"
                  >
                    {el.descriptor.name}
                  </Heading>
                  <Box textAlign="left" marginTop="0" paddingLeft={0}>
                    <Text
                      as="h5"
                      fontSize="xs"
                      fontFamily="Open Sans"
                      fontWeight="400"
                    >
                    {el.descriptor.description}
                    </Text>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </ Link>
      ));
    }
    return [filesHeading, filesForDisplay];
  };


  return (
    <VStack
      bgColor="gray.100"
      borderRadius="lg"
      w="45rem"
      paddingY={4}
      paddingX={8}
    >
      {displayRelatedArticles(
        sections.filter((el) => el.descriptor.type === 'article')
      )}

      {displayKnowMore(
        sections.filter((el) => el.descriptor.type === 'file')
      )}

      

      <HStack
        textAlign="left"
        justifyContent="flex-start"
        w="40rem"
        paddingTop={2}
      >
        <Heading
          fontFamily="Poppins"
          fontSize="sm"
          color="gray.600"
          fontWeight="400"
        >
          PARA HACER
        </Heading>
      </HStack>
      <Stack
        width="40rem"
        bgColor="white"
        borderRadius="lg"
        justifyContent="flex-start"
        alignItems="flex-start"
        direction="row"
        overflow="hidden"
        borderStyle="solid"
        borderWidth="1px"
        maxHeight="100px"
        _hover={{ bg: 'gray.100' }}
      >
        <Box w="90px" h="90px" p={2}>
          <Image src={quizIcon}></Image>
        </Box>
        <Stack width="100%" justifyContent="flex-start">
          <Stack width="100%" direction="row" alignItems="center" paddingX={4}>
            <Stack paddingTop={4} alignItems="flex-start">
              <Heading
                as="h3"
                size="sm"
                marginLeft={0}
                lineHeight="0.7rem"
                fontFamily="Open Sans"
              >
                Autoevaluación: División celular
              </Heading>
              <Box textAlign="left" marginTop="0" paddingLeft={0}>
                <Text
                  as="h5"
                  fontSize="xs"
                  fontFamily="Open Sans"
                  fontWeight="400"
                ></Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </VStack>
  );
};

export { SectionsList };
