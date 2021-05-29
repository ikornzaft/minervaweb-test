import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  createStandaloneToast,
  FormLabel,
  FormControl,
  Button,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import * as Yup from 'yup';

import { ArticleContentInputModal } from './articleContentInputModal';
import { ArticleContentList } from './articleContentList';
import { MultipageFormStep1 } from './multipageFormStep1';
import { MultipageFormStep2 } from './multipageFormStep2';

const ArticleForm = ({ isOpen, onClose, modalTitle }) => {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    articleImg: {},
    paragraphs: [],
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Es necesario incluir un título'),
    subtitle: Yup.string().required('Es necesario incluir un subtítulo'),
  });

  const {
    isOpen: isOpenContentLoader,
    onOpen: onOpenContentLoader,
    onClose: onCloseContentLoader,
  } = useDisclosure();

  const modalHandler = (e) => {
    onCloseContentLoader();
    onOpenContentLoader();
  };

  const [newArticle, setNewArticle] = useState({});

  const [currentStep, setCurrentStep] = useState(0);

  const createArticle = () => {
    console.log(newArticle);
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const randomId = uuidv4();
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: { randomId },
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/InsertArticle',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: 'root:cm9vdA==',
        message: {
          entity: {
            header: { publicId: 'test/2' },
            resource: {
              articleHeader: {
                descriptor: {
                  title: newArticle.title,
                  subtitle: newArticle.subtitle,
                },
              },
              paragraphs: [
                {
                  descriptor: {
                    description: newArticle.paragraph,
                  },
                },
              ],
              sections: [],
            },
          },
        },
      }),
    };
    let serverResponse = {};
    let loading = true;
    let error = '';

    const fetchData = async () => {
      try {
        const response = await fetch(url, jsonMessage);
        if (response.status >= 400 && response.status < 600)
          error = 'Bad response from server';
        const resJson = await response.json();
        serverResponse = resJson;
      } catch (err) {
        error = err;
      } finally {
        loading = false;
      }
    };
    fetchData();

    return { serverResponse, error, loading };
  };

  useEffect(() => {}, [data]);

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      setNewArticle(data);
      setCurrentStep(0);
      const toast = createStandaloneToast();
      toast({
        title: 'Artículo guardado.',
        description: 'Se creó un nuevo artículo.',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
      onClose();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (values) => {
    setData((prev) => ({ ...prev, ...values }));

    console.log(values);
  };

  const steps = [
    <MultipageFormStep1 next={handleNextStep} data={data} />,
    <MultipageFormStep2
      next={handleNextStep}
      data={data}
      prev={handlePrevStep}
    />,
  ];

  return (
    <>
      <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <ModalHeader alignSelf="center">{modalTitle}</ModalHeader>
          <ModalBody textAlign="center">
            <Formik
              validationSchema={validationSchema}
              initialValues={data}
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <Form>
                  <Field name="title">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel htmlFor="title">Título</FormLabel>
                        <Input {...field} id="title" placeholder="Título" />
                        <ErrorMessage name="title">
                          {(msg) => (
                            <Text color="red" fontSize="sm">
                              {msg}
                            </Text>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="subtitle">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel marginTop={4} htmlFor="subtitle">
                          Subtítulo
                        </FormLabel>
                        <Textarea
                          {...field}
                          id="subtitle"
                          placeholder="El copete del artículo"
                        />
                        <ErrorMessage name="subtitle">
                          {(msg) => (
                            <Text color="red" fontSize="sm">
                              {msg}
                            </Text>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="articleImg">
                    {({ field }) => (
                      <FormControl>
                        <FormLabel htmlFor="articleImg">
                          Imágen del artículo
                        </FormLabel>
                        <Input
                          type="file"
                          id="articleImg"
                          onChange={(event) =>
                            formikProps.setFieldValue(
                              'articleImg',
                              event.target.files[0]
                            )
                          }
                        />
                      </FormControl>
                    )}
                  </Field>

                  <VStack>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      type="button"
                      onClick={modalHandler}
                    >
                      Agregar contenido
                    </Button>
                    <ArticleContentList data={data} setData={setData} />
                  </VStack>
                  <Button mt={4} colorScheme="teal" type="submit">
                    Crear artículo
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalCloseButton />
          <ModalFooter />
        </ModalContent>
      </Modal>
      <ArticleContentInputModal
        isOpen={isOpenContentLoader}
        onClose={onCloseContentLoader}
        setData={setData}
      />
    </>
  );
};

export { ArticleForm };
