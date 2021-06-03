import React, { useState, useRef } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
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
  Input,
  Text,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  Flex,
  
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { FaTrashAlt } from 'react-icons/fa';

const ArticleContentInputModal = ({
  isOpen,
  onClose,
  paragraphList,
  setParagraphList,
}) => {
  const [articleContent, setArticleContent] = useState({
    textContent: [],
    images: [""],
  });

  const articleContentValidationSchema = Yup.object({});

  const [thumbnails, setThumbnails] = useState([]);

  const handleSubmit = (values) => {
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
        <ModalHeader alignSelf="center" paddingBottom={2}>
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
                <Tabs>
                  <TabList>
                    <Tab fontSize="sm" paddingY={1}>
                      Texto
                    </Tab>
                    <Tab fontSize="sm" paddingY={1}>
                      Imágenes
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
                            <ErrorMessage name="textContent">
                              {(msg) => (
                                <Text color="red" fontSize="sm">
                                  {msg}
                                </Text>
                              )}
                            </ErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </TabPanel>

                    <TabPanel>
                      <Form>
                        <FieldArray name="images">
                          {({ insert, remove, push }) => (
                            <Flex direction="column" bgColor="gray.100" p={4} borderRadius="lg">
                            <Flex direction="row" flexWrap="wrap" width="100%" justifyContent="space-evenly">
                              {formikProps.values.images.length > 0 &&
                                formikProps.values.images.map(
                                  (image, index) => (
                                      <Flex justifyContent="center" alignItems="flex-end" textAlign="center" marginBottom={2}>
                                          <Field name={`images.${index}.image`}>
                                            {({ field }) => (
                                              <FormControl display="flex" justifyContent="center" alignItems="center" textAlign="center">
                                                {thumbnails[index] ? (
                                                  <Image
                                                    src={thumbnails[index]}
                                                    w="120px"
                                                    h="120px"
                                                    borderStyle="dashed"
                                                    borderColor="gray.400"
                                                    borderRadius="lg"
                                                    borderWidth="2px"
                                                    objectFit="cover"
                                                    onClick={() => {
                                                      fileInputRef.current.click();
                                                    }}
                                                  />
                                                ) : (
                                                  <FormLabel
                                                    htmlFor={`images.${index}.image`}
                                                    bgColor="gray.200"
                                                    w="120px"
                                                    h="120px"
                                                    borderStyle="dashed"
                                                    borderWidth="2px"
                                                    borderRadius="lg"
                                                    borderColor="gray.400"
                                                    textAlign="center"
                                                    p={6}
                                                    marginBottom={0}
                                                    marginRight={0}
                                                    fontSize="sm"
                                                    onClick={(e) => {
                                                      fileInputRef.current.click();
                                                    }}
                                                  >
                                                    Click para agregar imágen{' '}
                                                    {index + 1}
                                                  </FormLabel>
                                                )}

                                                <Input
                                                  type="file"
                                                  id="image"
                                                  display="none"
                                                  accept="image/*"
                                                  ref={fileInputRef}
                                                  onChange={(event) => {
                                                    const file =
                                                      event.target.files[0];
                                                    if (
                                                      file &&
                                                      file.type.substring(
                                                        0,
                                                        5
                                                      ) === 'image'
                                                    ) {
                                                      const reader =
                                                        new FileReader();
                                                      reader.onloadend = () => {
                                                        const readerResult =
                                                          reader.result;

                                                        formikProps.setFieldValue(
                                                          `images.${index}.image`,
                                                          readerResult
                                                        );
                                                        setThumbnails(
                                                          (prev) => [
                                                            ...prev,
                                                            readerResult,
                                                          ]
                                                        );
                                                      };
                                                      reader.readAsDataURL(
                                                        file
                                                      );
                                                    }
                                                  }}
                                                />
                                              </FormControl>
                                            )}
                                          </Field>
                                        
                                          <Button
                                          fontSize="sm"
                                          size="xs"
                                          paddingY={2}
                                          borderRadius="0"
                                            type="button"
                                            className="secondary"
                                            onClick={() => {
                                              remove(index);
                                              const thumbArray = thumbnails;
                                              thumbArray.splice(index, 1);
                                              setThumbnails(thumbArray);
                                            }}
                                          >
                                            {<FaTrashAlt />}
                                          </Button>
                                      </Flex>
                                      )
                                      )}
                                      </Flex>
                                      <Flex justifyContent="center">
                                      <Button
                                      mt={4}
                  
                                      colorScheme="teal"
                                      type="button"
                                      size="sm"
                                      variant="outline"
                                      onClick={() => push({ image: '' })}
                                      >
                                      Agregar imágen
                                      </Button>
                                      </Flex>
                                      </Flex>
                                      )}
                        </FieldArray>
                      </Form>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                <Form>
                <Flex justifyContent="flex-end" paddingX={4}> 
                  <Button mt={4} colorScheme="teal" type="submit">
                    Confirmar contenido
                  </Button>
                  </Flex>
                </Form>
              </>
            )}
          </Formik>
        </ModalBody>

        <ModalCloseButton />
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export { ArticleContentInputModal };
