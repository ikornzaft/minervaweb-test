import React, { useState, useEffect } from 'react';
import { Formik, Field} from 'formik';
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
HStack,
Box,
} from '@chakra-ui/react';

const NewRequestModal = ({ isOpen, onClose }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Es necesario un título'),
    question: Yup.string().required('Es necesario un mensaje'),
    area: Yup.string().required('Se necesita seleccionar un área')
  });
  const initialValues = {
    title: "",
    question: "",
    area: ""
  };
  const onSubmit = values => {
    console.log(values);
  }
  
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
          <Box paddingBottom={6}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
            {(props) => (
              <Field name="title">
                {
                  ({field, form}) => {
                    return <FormControl isInvalid={form.errors["title"] && form.touched["title"]}>
                      <FormLabel htmlFor="title">Título</FormLabel>
                      <Input id="title" {...props} {...field} />
                      <FormErrorMessage>{form.errors["title"]}</FormErrorMessage>
                    </FormControl>
                  } 
                }
              </Field>
            )}
            <Button 
          type="submit"
          fontFamily="Poppins"
          fontWeight="400"
          colorScheme="blue"
          >Crear consulta</Button>
            </Formik>
          




           </Box> 
          
          <HStack w="100%" justifyContent="center" paddingY={4}>
          
          </HStack>
        </ModalBody>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
}

export { NewRequestModal }
