import React, { useState } from 'react';
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
  createStandaloneToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';

import { AREAS } from '../../locals/sp/areas';

const NewRequestModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Es necesario un título'),
    question: Yup.string().required('Es necesario ingresar una consulta'),
    area: Yup.string().required('Es necesario seleccionar una materia'),
  });
  const workAreas = [
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ];
  const initialValues = {
    title: '',
    question: '',
    area: '',
  };
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (values) => {
    const credentials = localStorage.getItem('credentials');
    const date = new Date();
    const formatedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    const questionId = 'Q-' + formatedDate + '-' + uuidv4();
    const newEntry = {
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/questions/handlers/InsertQuestion',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: credentials,
      message: {
        entity: {
          resource: {
            articleHeader: {
              descriptor: {
                subtitle: null,
                title: values.title,
                description: values.question,
              },
            },

            paragraphs: [
              {
                descriptor: {
                  title: values.question,
                },
              },
            ],

            workarea: { publicId: values.area },
            workgroup: { publicId: 'aula/test_a/quinto' },
          },
          header: { publicId: questionId },
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

        toast({
          title: 'Consulta enviada.',
          description: 'Se creó un nuevo consulta.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      } catch (err) {
        error = err;
        toast({
          title: 'Se produjo un error al crear la consulta',
          description: error,
          status: 'error',
          duration: 2500,
          isClosable: true,
        });
      } finally {
        setLoading(false);
        onClose();
      }
    };

    fetchData();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader alignSelf="center" color="gray.700" fontFamily="Poppins" fontWeight="300">
          Crear nueva consulta
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
                      <Field name="area">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              isInvalid={form.errors['area'] && form.touched['area']}
                              w="15rem"
                            >
                              <Select
                                borderRadius="md"
                                id="area"
                                placeholder="Selecciona la materia"
                                size="sm"
                                w="15rem"
                                {...props}
                                {...field}
                              >
                                {workAreas.map((option) => {
                                  return (
                                    <option key={option.value} value={option.value}>
                                      {option.key}
                                    </option>
                                  );
                                })}
                              </Select>
                              <FormErrorMessage fontSize="xs" position="absolute" top="28px">
                                {form.errors['area']}
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
                      <Field name="question">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              isInvalid={form.errors['question'] && form.touched['question']}
                              paddingBottom={8}
                            >
                              <FormLabel
                                fontSize="sm"
                                htmlFor="question"
                                position="absolute"
                                top="-22px"
                              >
                                Consulta
                              </FormLabel>
                              <Input
                                as="textarea"
                                fontSize="sm"
                                h="6rem"
                                id="question"
                                {...props}
                                {...field}
                              />
                              <FormErrorMessage fontSize="xs" position="absolute" top="91px">
                                {form.errors['question']}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                    </VStack>
                    <HStack justifyContent="center">
                      <Button
                        colorScheme="blue"
                        fontFamily="Poppins"
                        fontWeight="400"
                        type="submit"
                      >
                        Crear consulta
                      </Button>
                    </HStack>
                  </Form>
                </Stack>
              )}
            </Formik>
          </VStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export { NewRequestModal };
