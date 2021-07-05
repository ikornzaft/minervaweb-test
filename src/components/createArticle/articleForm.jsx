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
import { SectionsInputModal } from './sections/sectionsInputModal';
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

  const dropsDownOptions = [
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ];

  const date = new Date();
  const formatedDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  )
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
        const url =
          'http://afatecha.com:8080/minerva-server-web/minerva/perform';

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
          if (response.status >= 400 && response.status < 600)
            setError('Bad response from server');
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

          onClose();
        } catch (err) {
          error = err;
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
    subtitle: Yup.string().required(
      LABELS.CREATE_ARTICLE.FORM.ERRORS.SUBTITLE_ERROR
    ),
    workArea: Yup.string().required(
      LABELS.CREATE_ARTICLE.FORM.ERRORS.WORKAREA_ERROR
    ),
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
    setData((data) => ({ ...data, ...values }));
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
                        label={LABELS.CREATE_ARTICLE.FORM.AREA_SELECTOR.LABEL}
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
                              {LABELS.CREATE_ARTICLE.FORM.TITLE.LABEL}
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
                              {LABELS.CREATE_ARTICLE.FORM.SUBTITLE.LABEL}
                            </FormLabel>
                            <Textarea
                              fontSize="sm"
                              {...field}
                              id="subtitle"
                              placeholder={
                                LABELS.CREATE_ARTICLE.FORM.SUBTITLE.PLACEHOLDER
                              }
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
                        <ImageInput
                          coverImage={coverImage}
                          setCoverImage={setCoverImage}
                        />
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
                            {LABELS.CREATE_ARTICLE.FORM.SECTIONS.LABEL}
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
                            {LABELS.CREATE_ARTICLE.FORM.SECTIONS.BUTTON_1}
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
                            disabled={true}
                          >
                            {LABELS.CREATE_ARTICLE.FORM.SECTIONS.BUTTON_2}
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
                    marginY={3}
                    fontFamily="Poppins"
                    fontWeight="400"
                    colorScheme="blue"
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
        selectedArticles={selectedArticles}
        setSelectedArticles={setSelectedArticles}
        knowMore={knowMore}
        setKnowMore={setKnowMore}
        knowMoreLinks={knowMoreLinks}
        setKnowMoreLinks={setKnowMoreLinks}
        area={area}
      />
    </>
  );
};

export { ArticleForm };
