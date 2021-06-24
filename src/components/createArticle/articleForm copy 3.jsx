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
  Flex,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { AREAS } from '../../locals/sp/areas';

import { ArticleContentInputModal } from './articleContent/articleContentInputModal';
import { ArticleContentList } from './articleContent/articleContentList';
import { SectionsInputModal } from './sections/sectionsInputModal';
import { KnowMoreInputModal } from './sections/knowMoreInputModal';
import { ArticlesDb } from '../../resources/articlesDb';
import { ImageInput } from './imageInput';
import { AreaSelector } from './areaSelector';

const ArticleForm = ({ isOpen, onClose, modalTitle }) => {
  const [data, setData] = useState({
    title: '',
    subtitle: '',
    articleImg: {},
    articleImgFooter: '',
    paragraphs: [],
    workArea: '',
    sections: [],
  });

  const [paragraphList, setParagraphList] = useState([]);

  // Creamos el estado sectionList
  // Sections es un array con dos objetos (section1 y section2)
  // Cada sección tiene un array de objetos "contents"
  // Las propiedades de esos objetos cambian, de acuerdo al tipo de recurso (ej: article)
  // Por eso acá no defino nada dentro de contents

  // Le vamos a pasar sectionsList y su setter al modal KnowMoreInputModal
  const [sectionsList, setSectionsList] = useState([
    {
      section: { publicId: '1' },
      contents: [],
    },
    {
      section: { publicId: '2' },
      contents: [],
    },
  ]);

  const [area, setArea] = useState(null);

  const dropsDownOptions = [
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ];

  const randomId = uuidv4();
  const date = new Date();

  useEffect(() => {
    if (data.title) {
      /*       const createdSections = [];
      
            if (sectionsList.relatedArticles.length > 0) {
              sectionsList.relatedArticles.forEach((el) => {
                const articleToPush = {
                  descriptor: {
                    type: 'article',
                    articleId: el,
                    link: '',
                  },
                };
                createdSections.push(articleToPush);
              });
            }
       */

      /*       if (sectionsList.knowMore.length > 0) {
              sectionsList.knowMore.forEach((el) => {
                const articleToPush = {
                  descriptor: {
                    type: 'file',
                    articleId: '',
                    link: '',
                    file: el.id,
                    name: el.name,
                    description: el.description,
                  },
                };
                createdSections.push(articleToPush);
              });
            } */

      const newEntry = {
        _id: 'm:article/test/1',
        _rev: '3-bd716f0ffaf2f0b75861bc6113534c74',
        workArea: data.workArea,
        resource: {
          paragraphs: data.paragraphs,
          articleHeader: {
            descriptor: {
              subtitle: data.subtitle,
              title: data.title,
            },
            image: {
              descriptor: {
                subtitle: '',
                title: data.articleImgFooter,
              },
              locationType: 'relative',
              location: data.articleImg,
            },
          },
          sections: sectionsList,
        },
        subscribers: ['test/1'],
        keys: [],
        header: {
          schema: 'm:article',
          privateId: 'test/1',
          scope: 'PUBLIC',
          publicId: randomId,
        },
        logs: {
          inserted: {
            principal: 'root',
            millis: 1621891372496,
            timestamp: '2021-05-24 17:22:52',
          },
          modified: {
            principal: 'root',
            millis: 1621891372496,
            timestamp: date,
          },
        },
      };
      ArticlesDb.push(newEntry);
      const toast = createStandaloneToast();
      toast({
        title: 'Artículo guardado.',
        description: 'Se creó un nuevo artículo.',
        status: 'success',
        duration: 2500,
        isClosable: true,
      });
      setData({
        title: '',
        subtitle: '',
        articleImg: {},
        articleImgFooter: '',
        paragraphs: [],
        workArea: '',
      });
      setParagraphList([]);
      setSectionsList([
        {
          section: { publicId: '1' },
          contents: [],
        },
        {
          section: { publicId: '2' },
          contents: [],
        },
      ]);

      console.log(newEntry)

      onClose();
    } else {
      console.log('no hay data aun');
    }
  }, [data]);

  /*   useEffect(() => {
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
  }, [data]); */

  /*   const createArticle = () => {
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
  }; */

  const validationSchema = Yup.object({
    title: Yup.string().required('Es necesario incluir un título'),
    subtitle: Yup.string().required('Es necesario incluir un subtítulo'),
    workArea: Yup.string().required('Es necesaria una materia'),
  });

  const {
    isOpen: isOpenContentLoader,
    onOpen: onOpenContentLoader,
    onClose: onCloseContentLoader,
  } = useDisclosure();

  const {
    isOpen: isOpenSections,
    onOpen: onOpenSections,
    onClose: onCloseSections,
  } = useDisclosure();

  const {
    isOpen: isOpenKnowMore,
    onOpen: onOpenKnowMore,
    onClose: onCloseKnowMore,
  } = useDisclosure();

  const modalHandler = (e) => {
    onCloseContentLoader();
    onOpenContentLoader();
  };

  const knowMoreModalHandler = (e) => {
    onCloseKnowMore();
    onOpenKnowMore();
  };

  const sectionsModalHandler = (e) => {
    onCloseSections();
    onOpenSections();
  };

  const handleSubmit = (values) => {
    console.log(values)
    //setData((data) => ({ ...data, ...values }));
    const paragraphArray = [];
    const paragraphObj = { paragraphs: paragraphArray };
    paragraphList.forEach((el) => {
      const desc = { descriptor: { description: el } };
      paragraphArray.push(desc);
    });
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
                      <AreaSelector
                        label="Elegir la materia"
                        name="workArea"
                        options={dropsDownOptions}
                        area={area}
                        setArea={setArea}
                      />
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
                      <VStack w="100%" paddingTop={6}>
                        <Stack
                          w="100%"
                          direction="row"
                          justifyContent="flex-start"
                        >
                          <Text
                            fontSize="sm"
                            fontFamily="Open Sans"
                            htmlFor="subtitle"
                            marginBottom="0"
                          >
                            Agregar a Secciones
                          </Text>
                        </Stack>
                        <Flex
                          direction="row"
                          width="100%"
                          marginTop="1px !important"
                          borderWidth="1px"
                          borderRadius="md"
                          padding={2}
                          justifyContent="space-evenly"
                          alignItems="center"
                        >
                          <Button
                            colorScheme="blue"
                            type="button"
                            variant="outline"
                            w="9rem"
                            bgColor="white"
                            onClick={knowMoreModalHandler}
                            size="sm"
                            fontFamily="Poppins"
                            fontWeight="400"
                          >
                            Para saber más
                          </Button>
                          <Button
                            colorScheme="blue"
                            type="button"
                            variant="outline"
                            w="9rem"
                            bgColor="white"
                            onClick={sectionsModalHandler}
                            size="sm"
                            fontFamily="Poppins"
                            fontWeight="400"
                          >
                            Para hacer
                          </Button>
                        </Flex>
                      </VStack>
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
      <SectionsInputModal
        isOpen={isOpenSections}
        onClose={onCloseSections}
        sectionsList={sectionsList}
        setSectionsList={setSectionsList}
        area={area}
      />
      <KnowMoreInputModal
        isOpen={isOpenKnowMore}
        onClose={onCloseKnowMore}
        sectionsList={sectionsList}
        setSectionsList={setSectionsList}
        area={area}
      />
    </>
  );
};

export { ArticleForm };
