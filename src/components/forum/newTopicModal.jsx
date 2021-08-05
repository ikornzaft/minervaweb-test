import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  HStack,
  VStack,
  Stack,
  Box,
  useDisclosure,
  createStandaloneToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import { KnowMoreInputModal } from '../createArticle/sections/knowMoreInputModal';
import { AREAS } from '../../locals/sp/areas';

const NewTopicModal = ({ isOpen, onClose, articleId }) => {
  const [error, setError] = useState(null);
  const [prevArticle, setPrevArticle] = useState(null);

  useEffect(() => {
    if (articleId) {
      const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
      const credentials = localStorage.getItem('credentials');
      const jsonMessage = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          id: 'msgid-1',
          target: 'soa@service/minerva',
          method: 'mods/articles/handlers/GetArticle',
          requester: 'root:YWNhY2lhITIwMTc=',
          principal: credentials,

          message: {
            entityRef: { publicId: articleId },
          },
        }),
      };

      async function fetchData() {
        try {
          const res = await fetch(url, jsonMessage);

          if (res.status >= 400 && res.status < 600) setError('Bad response from server');
          const resJson = await res.json();

          setPrevArticle(resJson.message.entity);
        } catch (err) {
          setError(err);
        }
      }
      fetchData();
    }
  }, []);

  const [paragraphList, setParagraphList] = useState([
    {
      section: { publicId: '1' },
      contents: [],
    },
    {
      section: { publicId: '2' },
      contents: [],
    },
  ]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [contents, setContents] = useState([]);
  const [links, setLinks] = useState([]);
  const [workAreas, setWorkAreas] = useState([
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ]);
  const [area, setArea] = useState('mate');
  const {
    isOpen: isOpenKnowMore,
    onOpen: onOpenKnowMore,
    onClose: onCloseKnowMore,
  } = useDisclosure();
  const knowMoreModalHandler = (e) => {
    onCloseKnowMore();
    onOpenKnowMore();
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Es necesario un título'),
    message: Yup.string().required('Es necesario ingresar un mensaje'),
    group: Yup.string().required('Es necesario seleccionar un grupo'),
  });
  const initialValues = {
    title: '',
    message: '',
    group: '',
  };

  const storedGroups = JSON.parse(localStorage.getItem('workgroups'));
  const filteredGroups = storedGroups.filter((el) => !el.resource.private);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    const credentials = localStorage.getItem('credentials');
    const date = new Date();
    const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    const topicId = 'T-' + formatedDate + '-' + uuidv4();
    const newEntry = {
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/topics/handlers/InsertTopic',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: credentials,
      message: {
        entity: {
          resource: {
            articleHeader: {
              descriptor: {
                subtitle: values.message,
                title: values.title,
              },
            },
            paragraphs: paragraphList[0].contents,
            workgroup: { publicId: values.group },
          },
          header: { publicId: topicId },
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
        setLoading(true);
        const response = await fetch(url, jsonMessage);

        if (response.status >= 400 && response.status < 600) setError('Bad response from server');
        const resJson = await response.json();

        console.log(resJson);
        toast({
          title: 'Se publicó un nuevo tópico.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      } catch (err) {
        error = err;
        toast({
          title: 'Se produjo un error al crear el tópico',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setLoading(false);
        setParagraphList([
          {
            section: { publicId: '1' },
            contents: [],
          },
          {
            section: { publicId: '2' },
            contents: [],
          },
        ]);
        onClose();
      }
    };

    fetchData();
  };

  return (
    <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
          Crear nueva publicación
        </ModalHeader>
        <ModalBody paddingX={10} textAlign="left">
          <VStack justifyContent="center" paddingBottom={6}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Stack w="100%">
                  <Form>
                    <HStack justifyContent="center" paddingBottom={8} w="100%">
                      <Field name="group">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              isInvalid={form.errors['group'] && form.touched['group']}
                              w="15rem"
                            >
                              <Select
                                borderRadius="md"
                                id="group"
                                placeholder="Selecciona el grupo"
                                size="sm"
                                w="15rem"
                                {...props}
                                {...field}
                              >
                                {filteredGroups.map((option) => {
                                  return (
                                    <option
                                      key={option.resource.descriptor.title}
                                      value={option.header.privateId}
                                    >
                                      {option.resource.descriptor.title}
                                    </option>
                                  );
                                })}
                              </Select>
                              <FormErrorMessage fontSize="xs" position="absolute" top="28px">
                                {form.errors['group']}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                    </HStack>
                    <VStack w="100%">
                      <Field name="title">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              isInvalid={form.errors['title'] && form.touched['title']}
                              paddingBottom={10}
                            >
                              <FormLabel
                                fontSize="sm"
                                htmlFor="title"
                                position="absolute"
                                top="-22px"
                              >
                                Título
                              </FormLabel>
                              <Input fontSize="sm" id="title" {...props} {...field} />
                              <FormErrorMessage fontSize="xs" position="absolute" top="35px">
                                {form.errors['title']}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                      <Field name="message">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              isInvalid={form.errors['message'] && form.touched['message']}
                              paddingBottom={4}
                            >
                              <FormLabel
                                fontSize="sm"
                                htmlFor="message"
                                position="absolute"
                                top="-22px"
                              >
                                Mensaje
                              </FormLabel>
                              <Input
                                as="textarea"
                                fontSize="sm"
                                h="6rem"
                                id="message"
                                paddingY={2}
                                {...props}
                                {...field}
                              />
                              <FormErrorMessage fontSize="xs" position="absolute" top="91px">
                                {form.errors['message']}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                    </VStack>
                    <VStack justifyContent="center">
                      <Box paddingBottom={4}>
                        <Button
                          bgColor="white"
                          colorScheme="blue"
                          fontFamily="Poppins"
                          fontWeight="400"
                          size="sm"
                          type="button"
                          variant="outline"
                          onClick={knowMoreModalHandler}
                        >
                          Agregar contenido
                        </Button>
                      </Box>
                      <Button
                        colorScheme="blue"
                        fontFamily="Poppins"
                        fontWeight="400"
                        type="submit"
                      >
                        Crear publicación
                      </Button>
                    </VStack>
                  </Form>
                </Stack>
              )}
            </Formik>
            <KnowMoreInputModal
              area={area}
              isOpen={isOpenKnowMore}
              knowMore={contents}
              knowMoreLinks={links}
              prevArticle={prevArticle}
              sectionsList={paragraphList}
              selectedArticles={selectedArticles}
              setKnowMore={setContents}
              setKnowMoreLinks={setLinks}
              setSectionsList={setParagraphList}
              setSelectedArticles={setSelectedArticles}
              title="Selecciona contenido"
              workAreas={workAreas}
              onClose={onCloseKnowMore}
            />
          </VStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export { NewTopicModal };
