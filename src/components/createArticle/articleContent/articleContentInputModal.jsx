import React, { useState, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormLabel,
  FormControl,
  Button,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { ImageMultipleInput } from './imageMultipleInput';
import { FilesSelector } from './filesSelector';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GrTextAlignCenter } from 'react-icons/gr';

const ArticleContentInputModal = ({
  isOpen,
  onClose,
  paragraphList,
  setParagraphList,
}) => {
  const [articleContent, setArticleContent] = useState([]);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const articleContentValidationSchema = Yup.object({});

  const [thumbnails, setThumbnails] = useState([]);

  const handleSubmit = (values) => {
    //const paragraphsArray = values.textContent.split(/\r|\n/);
    let paragraphsToSubmit = [];

    if (values.textContent.length > 0) {
      const paragraphs = values.textContent.split(/\n\s*\n/);
      paragraphsToSubmit = paragraphs.map((el) => {
        const obj = {
          descriptor: {
            description: el,
          },
        };
        return obj;
      });
    }

    /*     setParagraphList((paragraphList) => [
      ...paragraphList,
      ...paragraphsToSubmit,
      ...uploadedFiles
    ]); */

    uploadedFiles ? setParagraphList(paragraphsToSubmit.concat(uploadedFiles)) : setParagraphList(paragraphsToSubmit);

    setThumbnails([]);
    setUploadedFiles([]);
    onClose();
  };

  const fileInputRef = useRef();

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          alignSelf="center"
          paddingBottom={2}
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          Agregar contenido
        </ModalHeader>
        <ModalBody textAlign="center">
          <Formik
            validationSchema={articleContentValidationSchema}
            initialValues={articleContent}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <>
                <Form>
                  <Tabs>
                    <TabList>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        Texto
                      </Tab>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        Archivos
                      </Tab>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        Audios
                      </Tab>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        Videos
                      </Tab>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        Links
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <Field name="textContent">
                          {({ field }) => (
                            <FormControl>
                              <FormLabel
                                fontSize="sm"
                                marginTop={4}
                                htmlFor="textContent"
                                fontFamily="Open Sans"
                              >
                                Texto del artículo
                              </FormLabel>
                              <Textarea
                                fontSize="sm"
                                height={32}
                                {...field}
                                id="textContent"
                                placeholder="Ingresar el texto del artículo"
                              />
                            </FormControl>
                          )}
                        </Field>
                      </TabPanel>

                      <TabPanel>
                        <FilesSelector
                          uploadedFiles={uploadedFiles}
                          setUploadedFiles={setUploadedFiles}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                  <Flex justifyContent="center" paddingX={4}>
                    <Button
                      mt={4}
                      fontFamily="Poppins"
                      fontWeight="400"
                      colorScheme="blue"
                      type="submit"
                    >
                      Confirmar contenido
                    </Button>
                  </Flex>
                </Form>
              </>
            )}
          </Formik>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export { ArticleContentInputModal };
