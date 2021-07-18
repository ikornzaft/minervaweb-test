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
import { AREAS } from '../../locals/sp/areas';
import { v4 as uuidv4 } from 'uuid';

const NewTopicModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Es necesario un título'),
    message: Yup.string().required('Es necesario ingresar una consulta'),
    group: Yup.string().required('Es necesario seleccionar un grupo'),
  });
  const initialValues = {
    title: '',
    message: '',
    group: '',
  };
  const storedGroups = JSON.parse(localStorage.getItem('userWorkgroups'));
  const filteredGroups = storedGroups.filter(el => el.publicId.substring(0, 4) !== 'priv')
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

            paragraphs: [
              {
                descriptor: {
                  title: values.message,
                },
              },
            ],

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
        if (response.status >= 400 && response.status < 600)
          setError('Bad response from server');
        const resJson = await response.json();
        console.log(resJson)
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
          Crear nueva publicación
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
                      <Field name="group">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              w="15rem"
                              isInvalid={
                                form.errors['group'] && form.touched['group']
                              }
                            >
                              <Select
                                placeholder="Selecciona el grupo"
                                borderRadius="md"
                                size="sm"
                                w="15rem"
                                id="group"
                                {...props}
                                {...field}
                              >
                                {filteredGroups.map((option) => {
                                  return (
                                    <option
                                      key={option.publicId}
                                      value={option.publicId}
                                    >
                                      {option.publicId}
                                    </option>
                                  );
                                })}
                              </Select>
                              <FormErrorMessage
                                position="absolute"
                                top="28px"
                                fontSize="xs"
                              >
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
                      <Field name="message">
                        {({ field, form }) => {
                          return (
                            <FormControl
                              paddingBottom={8}
                              isInvalid={
                                form.errors['message'] &&
                                form.touched['message']
                              }
                            >
                              <FormLabel
                                htmlFor="message"
                                position="absolute"
                                top="-22px"
                                fontSize="sm"
                              >
                                Mensaje
                              </FormLabel>
                              <Input
                                h="6rem"
                                fontSize="sm"
                                as="textarea"
                                id="message"
                                {...props}
                                {...field}
                              />
                              <FormErrorMessage
                                fontSize="xs"
                                position="absolute"
                                top="91px"
                              >
                                {form.errors['message']}
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
                        Crear publicación
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

export { NewTopicModal };
