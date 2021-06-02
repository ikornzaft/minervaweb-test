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
} from '@chakra-ui/react';
import * as Yup from 'yup';

const ArticleContentInputModal = ({
  isOpen,
  onClose,
  paragraphList,
  setParagraphList,
}) => {
  const [articleContent, setArticleContent] = useState({
    textContent: [],
    images: [],
  });

  const articleContentValidationSchema = Yup.object({});

  const [thumbnails, setThumbnails] = useState([]);

  const handleSubmit = (values) => {
    //const paragraphsArray = values.textContent.split(/\r|\n/);
    let paragraphsToSubmit = [];
    if (values.images[0] && values.images[0].image === "") {
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
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center">Agregar contenido</ModalHeader>
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
                    <Tab>Texto</Tab>
                    <Tab>Imágenes</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <Field name="textContent">
                        {({ field }) => (
                          <FormControl>
                            <FormLabel marginTop={4} htmlFor="textContent">
                              Texto
                            </FormLabel>
                            <Textarea
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
                            <div>
                              {formikProps.values.images.length > 0 &&
                                formikProps.values.images.map(
                                  (image, index) => (
                                    <div className="row" key={index}>
                                      <div className="col">
                                        <Field name={`images.${index}.image`}>
                                          {({ field }) => (
                                            <FormControl>
                                              {thumbnails[index] ? (
                                                <Image
                                                  src={thumbnails[index]}
                                                  w="120px"
                                                  h="120px"
                                                  borderStyle="dashed"
                                                  borderWidth="2px"
                                                  borderColor="gray.400"
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
                                                  borderColor="gray.400"
                                                  textAlign="center"
                                                  p={6}
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
                                                      setThumbnails((prev) => [
                                                        ...prev,
                                                        readerResult,
                                                      ]);
                                                    };
                                                    reader.readAsDataURL(file);
                                                  }
                                                }}
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                      </div>
                                      <div className="col">
                                        <Button
                                          type="button"
                                          className="secondary"
                                          onClick={() => {
                                            remove(index);
                                            const thumbArray = thumbnails;
                                            thumbArray.splice(index, 1);
                                            setThumbnails(thumbArray);
                                          }}
                                        >
                                          X
                                        </Button>
                                      </div>
                                    </div>
                                  )
                                )}
                              <Button
                                mt={4}
                                colorScheme="teal"
                                type="button"
                                onClick={() => push({ image: '' })}
                              >
                                Agregar imágen
                              </Button>
                            </div>
                          )}
                        </FieldArray>
                      </Form>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                <Form>
                  <Button mt={4} colorScheme="teal" type="submit">
                    Confirmar contenido
                  </Button>
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
