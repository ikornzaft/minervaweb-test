import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import * as Yup from 'yup';

const ArticleContentInputModal = ({ isOpen, onClose, modalTitle }) => {
  const [articleContent, setArticleContent] = useState({
    textContent: '',
    images: [],
  });

  const articleContentValidationSchema = Yup.object({
    textContent: Yup.string().required('Falta incorporar el contenido'),
  });

  const [newArticle, setNewArticle] = useState({});

  const handleSubmit = (values) => {
    setArticleContent((prev) => ({ ...prev, ...values }));

    console.log(values);
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center">"Agregar contenido"</ModalHeader>
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
                                              <FormLabel
                                                htmlFor={`images.${index}.image`}
                                              >
                                                Imágen {index + 1}
                                              </FormLabel>
                                              <Textarea
                                                {...field}
                                                id="image"
                                                placeholder="Imágen"
                                              />
                                            </FormControl>
                                          )}
                                        </Field>
                                      </div>
                                      <div className="col">
                                        <Button
                                          type="button"
                                          className="secondary"
                                          onClick={() => remove(index)}
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
