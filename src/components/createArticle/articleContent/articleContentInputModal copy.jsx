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
import { FaRegTrashAlt } from 'react-icons/fa';
import { GrTextAlignCenter } from 'react-icons/gr';

const ArticleContentInputModal = ({
  isOpen,
  onClose,
  paragraphList,
  setParagraphList,
}) => {
  const [articleContent, setArticleContent] = useState({
    descriptor: {
      title: 
    },
    textContent: [],
    images: [''],
  });

  const articleContentValidationSchema = Yup.object({});

  const [thumbnails, setThumbnails] = useState([]);

  const handleSubmit = (values) => {
    console.log('dos imagenes vacias: ', values.images);
    //const paragraphsArray = values.textContent.split(/\r|\n/);
    let paragraphsToSubmit = [];
    if (values.images[0] && values.images[0].image === '') {
      values.images = [];
    }
    if (values.textContent.length > 0) {
      const paragraphsArray = values.textContent.split(/\n\s*\n/);
      paragraphsToSubmit = paragraphsArray.concat(values.images);
    } else {
      paragraphsToSubmit = values.images;
    }

    console.log('parrafos para enviar: ', paragraphsToSubmit);

    setParagraphList((paragraphList) => [
      ...paragraphList,
      ...paragraphsToSubmit,
    ]);
    setThumbnails([]);
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
                        Imágenes
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
                        <FieldArray name="images">
                          {({ insert, remove, push }) => (
                            <Flex
                              direction="column"
                              bgColor="gray.100"
                              p={4}
                              borderRadius="lg"
                            >
                              <Flex
                                direction="row"
                                flexWrap="wrap"
                                width="100%"
                                justifyContent="space-evenly"
                              >
                                {formikProps.values.images.length > 0 &&
                                  formikProps.values.images.map(
                                    (image, index) => (
                                      <Flex
                                        justifyContent="center"
                                        alignItems="flex-end"
                                        textAlign="center"
                                        marginBottom={2}
                                      >
                                        <Field name={`images.${index}.image`}>
                                          {({ field, form }) => (
                                            <ImageMultipleInput
                                              fieldProps={field}
                                              formProps={form}
                                              thumbnails={thumbnails}
                                              setThumbnails={setThumbnails}
                                              index={index}
                                              fileInputRef={fileInputRef}
                                            />
                                          )}
                                        </Field>
                                        <Stack
                                          justifyContent="flex-end"
                                          height="100%"
                                          paddingBottom={1}
                                        >
                                          <Tooltip
                                            hasArrow
                                            borderRadius="lg"
                                            fontFamily="Open Sans"
                                            fontSize="xs"
                                            label="Agregar pié de imágen"
                                            bg="white"
                                            color="gray.700"
                                          >
                                            <Button
                                              fontSize="sm"
                                              size="xs"
                                              paddingY={2}
                                              type="button"
                                              className="secondary"
                                              bgColor="gray.200"
                                              borderRightRadius="md"
                                              borderLeftRadius="0"
                                              _hover={{ bgColor: 'gray.300' }}
                                              onClick={() => {
                                                remove(index);
                                                const thumbArray = thumbnails;
                                                thumbArray.splice(index, 1);
                                                setThumbnails(thumbArray);
                                              }}
                                            >
                                              {<GrTextAlignCenter />}
                                            </Button>
                                          </Tooltip>
                                          <Button
                                            fontSize="sm"
                                            size="xs"
                                            paddingY={2}
                                            borderRadius="0"
                                            type="button"
                                            className="secondary"
                                            bgColor="gray.200"
                                            borderRightRadius="md"
                                            borderLeftRadius="0"
                                            _hover={{ bgColor: 'gray.300' }}
                                            onClick={() => {
                                              remove(index);
                                              const thumbArray = thumbnails;
                                              thumbArray.splice(index, 1);
                                              setThumbnails(thumbArray);
                                            }}
                                          >
                                            {<FaRegTrashAlt />}
                                          </Button>
                                        </Stack>
                                      </Flex>
                                    )
                                  )}
                              </Flex>
                              <Flex justifyContent="center">
                                <Button
                                  mt={4}
                                  colorScheme="blue"
                                  type="button"
                                  size="xs"
                                  fontFamily="Poppins"
                                  fontWeight="400"
                                  variant="outline"
                                  bgColor="white"
                                  onClick={() => push({ image: '' })}
                                >
                                  Agregar imágen
                                </Button>
                              </Flex>
                            </Flex>
                          )}
                        </FieldArray>
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
