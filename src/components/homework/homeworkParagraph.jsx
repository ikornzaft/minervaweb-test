import React, { useState } from 'react';
import {
  VStack,
  HStack,
  Stack,
  Heading,
  Box,
  Text,
  Image,
  RadioGroup,
  Radio,
  Textarea,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

import { FilesUploadModal } from './filesUploaderModal';

const HomeworkParagraph = ({
  paragraph,
  paragraphIndex,
  paragraphsLength,
  answersArray,
  setAnswersArray,
  handleChangeTextAnswer,
  handleChangeFilesContent,
  setSendedAnswer,
  setUploadedFiles,
  uploadedFiles,
}) => {
  const options = paragraph.content.options;
  const allowsFileUpload = paragraph.descriptor.subtitle;
  const [value, setValue] = useState('');

  const {
    isOpen: isOpenFileUploader,
    onOpen: onOpenFileUploader,
    onClose: onCloseFileUploader,
  } = useDisclosure();

  const fileUploaderHandler = (e) => {
    onCloseFileUploader();
    onOpenFileUploader();
  };

  const selectRadio = (el) => {
    setValue(+el);
    handleChangeTextAnswer(paragraphIndex, options[el].descriptor.title);
  };

  return (
    <VStack borderColor="gray.300" borderRadius="lg" borderWidth="1px" p={3} w="45rem">
      {paragraphsLength > 1 ? <Text fontSize="xs">CONSIGNA {paragraphIndex + 1}:</Text> : null}
      <Box paddingBottom={1}>
        <Heading as="h3" fontFamily="open sans" fontSize="md" fontWeight="400">
          {paragraph.descriptor.title}
        </Heading>
      </Box>
      <Box paddingBottom={1}>
        {paragraph.content.link ? (
          <Image
            borderRadius="lg"
            objectFit="cover"
            src={`http://www.afatecha.com/id/files/image/${paragraph.content.link.location}`}
            width="25rem"
          />
        ) : null}
      </Box>
      {options.length > 0 ? (
        <Box>
          {options.map((option, index) => (
            <RadioGroup key={index} value={value} onChange={selectRadio}>
              <Stack p={1}>
                <HStack
                  _hover={{ bg: 'gray.200' }}
                  bg="gray.100"
                  borderColor="gray.300"
                  borderRadius="lg"
                  borderWidth="1px"
                  p={3}
                  w="35rem"
                >
                  <Radio borderColor="gray.400" value={index} w="100%">
                    <Box w="100%">
                      <Text>{option.descriptor.title}</Text>
                    </Box>
                  </Radio>
                </HStack>
              </Stack>
            </RadioGroup>
          ))}
        </Box>
      ) : (
        <VStack w="100%">
          <Textarea
            placeholder="Tu respuesta..."
            w="35rem"
            onChange={(el) => handleChangeTextAnswer(paragraphIndex, el.target.value)}
          />
          {allowsFileUpload === 'files' ? (
            <HStack justifyContent="flex-end" paddingX={16} w="100%">
              <Button
                colorScheme="blue"
                fontWeight="400"
                leftIcon={<FiUpload />}
                size="xs"
                variant="outline"
                w="10rem"
                onClick={fileUploaderHandler}
              >
                Subir archivo
              </Button>
            </HStack>
          ) : null}
        </VStack>
      )}
      <FilesUploadModal
        handleChangeFilesContent={handleChangeFilesContent}
        index={paragraphIndex}
        isOpen={isOpenFileUploader}
        setSendedAnswer={setSendedAnswer}
        setUploadedFiles={setUploadedFiles}
        title="Subir archivo"
        uploadedFiles={uploadedFiles}
        onClose={onCloseFileUploader}
      />
    </VStack>
  );
};

export { HomeworkParagraph };
