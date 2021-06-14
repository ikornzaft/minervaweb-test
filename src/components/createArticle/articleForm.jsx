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
  createStandaloneToast,
  FormLabel,
  FormControl,
  Button,
  Input,
  Text,
  Textarea,
  useDisclosure,
  VStack,
  Stack,
  HStack,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';

import { ArticleContentInputModal } from './articleContentInputModal';
import { ArticleContentList } from './articleContentList';
import { ImageInput } from './imageInput';

const ArticleForm = ({ isOpen, onClose, modalTitle }) => {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    articleImg: {},
    paragraphs: [],
  });
  const [paragraphList, setParagraphList] = useState([]);

  useEffect(() => {
    if (data.title) {
      console.log('llegó la data');
      console.log(data);
      createArticle();
      const toast = createStandaloneToast();
      toast({
        title: 'Artículo guardado.',
        description: 'Se creó un nuevo artículo.',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
      onClose();
    } else {
      console.log('no hay data aun');
    }
  }, [data]);

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

  const createArticle = () => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const randomId = uuidv4();
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/InsertArticle',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: 'root:cm9vdA==',
        message: {
          entity: {
            header: { publicId: randomId },
            resource: {
              articleHeader: {
                descriptor: {
                  title: data.title,
                  subtitle: data.subtitle,
                },
              },
              paragraphs: data.paragraphs,
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
        console.log(err);
      } finally {
        loading = false;
        console.log(serverResponse);
      }
    };
    fetchData();

    return { serverResponse, error, loading };
  };

  const handleSubmit = (values) => {
    //setData((data) => ({ ...data, ...values }));
    console.log(paragraphList);
    const paragraphArray = [];
    const paragraphObj = { paragraphs: paragraphArray };
    paragraphList.forEach((el) => {
      const desc = { descriptor: { description: el } };
      paragraphArray.push(desc);
    });
    console.log(paragraphObj);
    setData((data) => ({ ...data, ...values, ...paragraphObj }));

    return;
  };

  return (
    <>
      <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <ModalHeader
            alignSelf="center"
            color="gray.700"
            fontFamily="Poppins"
            fontWeight="300"
          >
            {modalTitle}
          </ModalHeader>
          <ModalBody textAlign="center">
            <Formik
              validationSchema={validationSchema}
              initialValues={data}
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <Form>
                  <Stack
                    direction="row"
                    w="full"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <VStack as="section" paddingX={6} w="50%" paddingBottom={6}>
                      <Field name="title">
                        {({ field }) => (
                          <FormControl h={24} overflow="hidden" padding="0">
                            <FormLabel
                              fontSize="sm"
                              fontFamily="Open Sans"
                              htmlFor="title"
                              marginBottom="0"
                            >
                              Título
                            </FormLabel>
                            <Input fontSize="sm" {...field} id="title" />
                            <ErrorMessage name="title">
                              {(msg) => (
                                <Text
                                  color="red"
                                  fontSize="xs"
                                  fontFamily="Open Sans"
                                >
                                  {msg}
                                </Text>
                              )}
                            </ErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="subtitle">
                        {({ field }) => (
                          <FormControl h={32} overflow="hidden" padding="0">
                            <FormLabel
                              fontSize="sm"
                              fontFamily="Open Sans"
                              htmlFor="subtitle"
                              marginBottom="0"
                            >
                              Subtítulo
                            </FormLabel>
                            <Textarea
                              fontSize="sm"
                              {...field}
                              id="subtitle"
                              placeholder="Descripción del artículo"
                            />
                            <ErrorMessage name="subtitle">
                              {(msg) => (
                                <Text
                                  color="red"
                                  fontFamily="Open Sans"
                                  fontSize="xs"
                                >
                                  {msg}
                                </Text>
                              )}
                            </ErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Stack direction="row">
                        <HStack
                          marginTop={4}
                          padding={2}
                          bgColor="gray.50"
                          borderRadius="md"
                          alignItems="flex-end"
                          borderStyle="solid"
                          borderWidth="1px"
                        >
                          <Field name="articleImg">
                            {({ field }) => (
                              <ImageInput
                                fieldProps={field}
                                formProps={formikProps}
                                index="0"
                              />
                            )}
                          </Field>
                          <Field name="articleImgFooter">
                            {({ field }) => (
                              <Textarea
                                fontSize="sm"
                                backgroundColor="white"
                                {...field}
                                id="articleImgFooter"
                                placeholder="Descripción de la imágen"
                              />
                            )}
                          </Field>
                        </HStack>
                      </Stack>
                      <Box paddingTop={4}>
                        <Button
                          mt={4}
                          colorScheme="blue"
                          type="button"
                          variant="outline"
                          bgColor="white"
                          onClick={modalHandler}
                          size="sm"
                          fontFamily="Poppins"
                          fontWeight="400"
                        >
                          Agregar Secciones
                        </Button>
                      </Box>
                    </VStack>

                    <VStack
                      w="50%"
                      h="30rem"
                      maxHeight="30rem"
                      overflowY="scroll"
                      borderWidth="1px"
                      borderRadius="md"
                      paddingLeft={6}
                    >
                      <HStack justifyContent="center">
                        <Button
                          mt={4}
                          colorScheme="blue"
                          type="button"
                          variant="outline"
                          bgColor="white"
                          onClick={modalHandler}
                          size="sm"
                          fontFamily="Poppins"
                          fontWeight="400"
                        >
                          Agregar contenido
                        </Button>
                      </HStack>
                      <ArticleContentList
                        paragraphList={paragraphList}
                        setParagraphList={(value) => setParagraphList(value)}
                      />
                    </VStack>
                  </Stack>
                  <Button
                    marginY={3}
                    fontFamily="Poppins"
                    fontWeight="400"
                    colorScheme="blue"
                    type="submit"
                  >
                    Crear artículo
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalCloseButton />
        </ModalContent>
      </Modal>
      <ArticleContentInputModal
        isOpen={isOpenContentLoader}
        onClose={onCloseContentLoader}
        paragraphList={paragraphList}
        setParagraphList={setParagraphList}
      />
    </>
  );
};

export { ArticleForm };
