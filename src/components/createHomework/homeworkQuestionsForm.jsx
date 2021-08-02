import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Box,
  Text,
  HStack,
  VStack,
  Switch,
  IconButton,
} from '@chakra-ui/react';
import { CoverImageInput } from '../draft/coverImageInput';

const HomeworkQuestionsForm = ({
  homeworkQuestionsArray,
  changeQuestionsArray,
  isOpen,
  onClose,
  modalTitle,
  prevImage,
  prevQuestion,
  prevAnswers,
  buttonText,
}) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [option, setOption] = useState(0);

  useEffect(() => {
    setImage(prevImage);
    setQuestion(prevQuestion);
    if (prevAnswers) {
      setAnswersArray(prevAnswers);
    }
  }, [prevImage, prevQuestion, prevAnswers]);

  const addNewQuestionToArray = () => {
    if (question !== '') {
      let newEntry;

      if (image) {
        newEntry = {
          descriptor: {
            title: question,
            subtitle: '',
          },
          content: {
            link: {
              locationType: 'relative',
              location: image.location,
              type: 'image',
            },
          },
        };
      } else {
        newEntry = {
          descriptor: {
            title: question,
            subtitle: '',
          },
          content: {},
        };
      }
      changeQuestionsArray(newEntry);
      setQuestion('');
      setImage(null);
      setAnswersArray([]);
      onClose();
    }
  };

  const onImageChange = (newImage) => {
    setImage(newImage);
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={2}>
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          {modalTitle}
        </ModalHeader>
        <ModalBody textAlign="center">
          <Tabs>
            <TabList justifyContent="center">
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
              >
                Consigna
              </Tab>
              <Tab
                fontSize="sm"
                width="12rem"
                fontFamily="Open Sans"
                paddingY={1}
              >
                Imágen
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box h="8rem">
                  <FormLabel fontFamily="Open Sans" htmlFor="question">
                    <Text fontSize="sm">Consigna</Text>
                  </FormLabel>
                  <Textarea
                    fontSize="sm"
                    h="6rem"
                    id="question"
                    value={question}
                    onChange={(el) => setQuestion(el.target.value)}
                  />
                </Box>
              </TabPanel>

              <TabPanel>
                <HStack w="100%" justifyContent="center">
                  <VStack
                    w="60%"
                    p={4}
                    bg="gray.50"
                    borderRadius="md"
                    borderStyle="solid"
                    borderWidth="1px"
                    marginBottom={4}
                  >
                    <Box paddingBottom={2}>
                      <Text fontSize="sm">Seleccionar imágen (opcional)</Text>
                    </Box>
                    <CoverImageInput
                      image={image}
                      setIsImage={setIsImage}
                      onImageChange={onImageChange}
                    />
                  </VStack>
                </HStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter>
          <HStack w="100%" justifyContent="center">
            <Button variant="primary" w="12rem" onClick={addNewQuestionToArray}>
              {buttonText}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { HomeworkQuestionsForm };
