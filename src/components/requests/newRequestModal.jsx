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
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Select,
  HStack,
  VStack,
  Stack,
  Box,
  createStandaloneToast,
} from '@chakra-ui/react';
import { AREAS } from '../../locals/sp/areas';
import { v4 as uuidv4 } from 'uuid';

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
    const formatedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
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
        if (response.status >= 400 && response.status < 600)
          setError('Bad response from server');
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
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          Crear nueva consulta
        </ModalHeader>
        <ModalBody textAlign="left" paddingX={10}>
          <VStack justifyContent="center" paddingBottom={6}>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {(props) => (
                <Stack w="100%">
                  <Form>
                    <HStack w="100%" justifyContent="center" paddingBottom={8}>
                      <Field name="area">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              w="15rem"
                              isInvalid={
                                form.errors['area'] && form.touched['area']
                              }
                            >
                              <Select
                                placeholder="Selecciona la materia"
                                borderRadius="md"
                                size="sm"
                                w="15rem"
                                id="area"
                                {...props}
                                {...field}
                              >
                                {workAreas.map((option) => {
                                  return (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.key}
                                    </option>
                                  );
                                })}
                              </Select>
                              <FormErrorMessage
                                position="absolute"
                                top="28px"
                                fontSize="xs"
                              >
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
                              paddingBottom={10}
                              isInvalid={
                                form.errors['title'] && form.touched['title']
                              }
                            >
                              <FormLabel
                                htmlFor="title"
                                position="absolute"
                                top="-22px"
                                fontSize="sm"
                              >
                                Título
                              </FormLabel>
                              <Input
                                id="title"
                                fontSize="sm"
                                {...props}
                                {...field}
                              />
                              <FormErrorMessage
                                fontSize="xs"
                                position="absolute"
                                top="35px"
                              >
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
                              paddingBottom={8}
                              isInvalid={
                                form.errors['question'] &&
                                form.touched['question']
                              }
                            >
                              <FormLabel
                                htmlFor="question"
                                position="absolute"
                                top="-22px"
                                fontSize="sm"
                              >
                                Consulta
                              </FormLabel>
                              <Input
                                h="6rem"
                                fontSize="sm"
                                as="textarea"
                                id="question"
                                {...props}
                                {...field}
                              />
                              <FormErrorMessage
                                fontSize="xs"
                                position="absolute"
                                top="91px"
                              >
                                {form.errors['question']}
                              </FormErrorMessage>
                            </FormControl>
                          );
                        }}
                      </Field>
                    </VStack>
                   <HStack justifyContent="center">
                    <Button
                      type="submit"
                      fontFamily="Poppins"
                      fontWeight="400"
                      colorScheme="blue"
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
