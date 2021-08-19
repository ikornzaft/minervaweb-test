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
} from '@chakra-ui/react';
import * as Yup from 'yup';

import { LABELS } from '../../locals/sp/labels';
import { AREAS } from '../../locals/sp/areas';

import { ArticleContentInputModal } from './articleContent/articleContentInputModal';
import { ArticleContentList } from './articleContent/articleContentList';
import { TodoInputModal } from './sections/todoInputModal';
import { KnowMoreInputModal } from './sections/knowMoreInputModal';
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
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [knowMore, setKnowMore] = useState([]);
  const [knowMoreLinks, setKnowMoreLinks] = useState([]);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [paragraphList, setParagraphList] = useState([]);
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

  const [coverImage, setCoverImage] = useState(null);
  const [area, setArea] = useState(null);
  const [workAreas, setWorkAreas] = useState([
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ]);

  useEffect(() => {
    if (localStorage.getItem('isResearcher') === 'true') {
      const researchArea = {
        key: 'Investigación',
        value: 'research',
      };

      setWorkAreas([...workAreas, researchArea]);
    }
  }, []);

  const date = new Date();
  const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
  const randomId = formatedDate + '-' + uuidv4();

  useEffect(() => {
    const principal = localStorage.getItem('credentials');

    if (data.title) {
      const newEntry = {
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/InsertArticle',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: principal,
        message: {
          entity: {
            resource: {
              paragraphs: paragraphList,
              articleHeader: {
                descriptor: {
                  subtitle: data.subtitle,
                  title: data.title,
                },
                ...coverImage,
              },
              sections: sectionsList,
              workarea: { publicId: data.workArea },
            },
            header: {
              publicId: randomId,
            },
          },
        },
      };

      const fetchData = async () => {
        const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';

        const jsonMessage = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify(newEntry),
        };

        const toast = createStandaloneToast();

        try {
          const response = await fetch(url, jsonMessage);

          if (response.status >= 400 && response.status < 600) setError('Bad response from server');
          const resJson = await response.json();

          toast({
            title: LABELS.CREATE_ARTICLE.FORM.TOASTS.SUCCESS.TITLE,
            description: LABELS.CREATE_ARTICLE.FORM.TOASTS.SUCCESS.DESCRIPTION,
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
          setSelectedArticles([]);
          setKnowMore([]);
          setKnowMoreLinks([]);
          setCoverImage(null);
          setSelectedQuizzes([]);

          onClose();
        } catch (err) {
          serError(err);
          toast({
            title: LABELS.CREATE_ARTICLE.FORM.TOASTS.ERROR.TITLE,
            description: error,
            status: 'error',
            duration: 2500,
            isClosable: true,
          });
        }
      };

      fetchData();
    } else {
    }
  }, [data]);

  const validationSchema = Yup.object({
    title: Yup.string().required(LABELS.CREATE_ARTICLE.FORM.ERRORS.TITLE_ERROR),
    subtitle: Yup.string().required(LABELS.CREATE_ARTICLE.FORM.ERRORS.SUBTITLE_ERROR),
    workArea: Yup.string().required(LABELS.CREATE_ARTICLE.FORM.ERRORS.WORKAREA_ERROR),
  });

  const {
    isOpen: isOpenContentLoader,
    onOpen: onOpenContentLoader,
    onClose: onCloseContentLoader,
  } = useDisclosure();

  const { isOpen: isOpenTodo, onOpen: onOpenTodo, onClose: onCloseTodo } = useDisclosure();

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

  const todoModalHandler = (e) => {
    onCloseTodo();
    onOpenTodo();
  };

  const handleSubmit = (values) => {
    setData((data) => ({ ...data, ...values }));

    return;
  };

  return (
    <>
      <Modal isOpen={isOpen} size="6xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={2}>
          <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
            {modalTitle}
          </ModalHeader>
          <ModalBody textAlign="center">
            <Formik
              initialValues={data}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <Form>
                  <Stack alignItems="center" direction="row" justifyContent="space-evenly" w="full">
                    <VStack as="section" paddingBottom={6} paddingX={6} w="50%">
                      <AreaSelector
                        area={area}
                        label={LABELS.CREATE_ARTICLE.FORM.AREA_SELECTOR.LABEL}
                        name="workArea"
                        options={workAreas}
                        setArea={setArea}
                      />
                      <Field name="title">
                        {({ field }) => (
                          <FormControl h={24} overflow="hidden" padding="0">
                            <FormLabel
                              fontFamily="Open Sans"
                              fontSize="sm"
                              htmlFor="title"
                              marginBottom="0"
                            >
                              {LABELS.CREATE_ARTICLE.FORM.TITLE.LABEL}
                            </FormLabel>
                            <Input fontSize="sm" {...field} id="title" />
                            <ErrorMessage name="title">
                              {(msg) => (
                                <Text color="red" fontFamily="Open Sans" fontSize="xs">
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
                              fontFamily="Open Sans"
                              fontSize="sm"
                              htmlFor="subtitle"
                              marginBottom="0"
                            >
                              {LABELS.CREATE_ARTICLE.FORM.SUBTITLE.LABEL}
                            </FormLabel>
                            <Textarea
                              fontSize="sm"
                              {...field}
                              id="subtitle"
                              placeholder={LABELS.CREATE_ARTICLE.FORM.SUBTITLE.PLACEHOLDER}
                            />
                            <ErrorMessage name="subtitle">
                              {(msg) => (
                                <Text color="red" fontFamily="Open Sans" fontSize="xs">
                                  {msg}
                                </Text>
                              )}
                            </ErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Stack direction="row">
                        <ImageInput coverImage={coverImage} setCoverImage={setCoverImage} />
                      </Stack>
                      <VStack paddingTop={6} w="100%">
                        <Stack direction="row" justifyContent="flex-start" w="100%">
                          <Text
                            fontFamily="Open Sans"
                            fontSize="sm"
                            htmlFor="subtitle"
                            marginBottom="0"
                          >
                            {LABELS.CREATE_ARTICLE.FORM.SECTIONS.LABEL}
                          </Text>
                        </Stack>
                        <Flex
                          alignItems="center"
                          borderRadius="md"
                          borderWidth="1px"
                          direction="row"
                          justifyContent="space-evenly"
                          marginTop="1px !important"
                          padding={2}
                          width="100%"
                        >
                          <Button
                            bgColor="white"
                            colorScheme="blue"
                            fontFamily="Poppins"
                            fontWeight="400"
                            size="sm"
                            type="button"
                            variant="outline"
                            w="9rem"
                            onClick={knowMoreModalHandler}
                          >
                            {LABELS.CREATE_ARTICLE.FORM.SECTIONS.BUTTON_1}
                          </Button>
                          <Button
                            bgColor="white"
                            colorScheme="blue"
                            fontFamily="Poppins"
                            fontWeight="400"
                            size="sm"
                            type="button"
                            variant="outline"
                            w="9rem"
                            onClick={todoModalHandler}
                          >
                            {LABELS.CREATE_ARTICLE.FORM.SECTIONS.BUTTON_2}
                          </Button>
                        </Flex>
                      </VStack>
                    </VStack>

                    <VStack
                      borderRadius="md"
                      borderWidth="1px"
                      h="30rem"
                      maxHeight="30rem"
                      overflowY="scroll"
                      paddingLeft={6}
                      w="50%"
                    >
                      <HStack justifyContent="center">
                        <Button
                          bgColor="white"
                          colorScheme="blue"
                          fontFamily="Poppins"
                          fontWeight="400"
                          mt={4}
                          size="sm"
                          type="button"
                          variant="outline"
                          onClick={modalHandler}
                        >
                          {LABELS.CREATE_ARTICLE.FORM.PARAGRAPHS.BUTTON}
                        </Button>
                      </HStack>
                      <ArticleContentList
                        paragraphList={paragraphList}
                        setParagraphList={setParagraphList}
                      />
                    </VStack>
                  </Stack>
                  <Button
                    colorScheme="blue"
                    fontFamily="Poppins"
                    fontWeight="400"
                    marginY={3}
                    type="submit"
                  >
                    {LABELS.CREATE_ARTICLE.FORM.SUBMIT_BUTTON}
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
        paragraphList={paragraphList}
        setParagraphList={setParagraphList}
        onClose={onCloseContentLoader}
      />
      <TodoInputModal
        isOpen={isOpenTodo}
        sectionsList={sectionsList}
        selectedQuizzes={selectedQuizzes}
        setSectionsList={setSectionsList}
        setSelectedQuizzes={setSelectedQuizzes}
        workAreas={workAreas}
        onClose={onCloseTodo}
      />
      <KnowMoreInputModal
        area={area}
        isOpen={isOpenKnowMore}
        knowMore={knowMore}
        knowMoreLinks={knowMoreLinks}
        sectionsList={sectionsList}
        selectedArticles={selectedArticles}
        setKnowMore={setKnowMore}
        setKnowMoreLinks={setKnowMoreLinks}
        setSectionsList={setSectionsList}
        setSelectedArticles={setSelectedArticles}
        title="Para saber más..."
        workAreas={workAreas}
        onClose={onCloseKnowMore}
      />
    </>
  );
};

export { ArticleForm };
