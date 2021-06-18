import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormLabel,
  FormControl,
  Button,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
  Stack,
  Tooltip,
  Select,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { ImageMultipleInput } from './imageMultipleInput';
import { RelatedArticleSelector } from './relatedArticleSelector';
import { ArticlesDb } from '../../resources/articlesDb';
import { FaRegTrashAlt } from 'react-icons/fa';
import { GrTextAlignCenter } from 'react-icons/gr';

const SectionsInputModal = ({
  isOpen,
  onClose,
  sectionsList,
  setSectionsList,
  area,
}) => {
  const [relatedArticles, setRelatedArticles] = useState([""]);
  const [knowMore, setKnowMore] = useState([]);
  const [toDo, setToDo] = useState([]);

  const [areaArticles, setAreaArticles] = useState([]);
  const [selectorOptions, setSelectorOptions] = useState([]);

  useEffect(() => {
    const articles = ArticlesDb.filter((e) => e.workArea === area);
    setSelectorOptions([]);
    setAreaArticles(articles);
    if (articles.length > 0) {
      articles.forEach((el) => {
        // Falta filtrar si ese artículo ya fue elegido
        const newOption = {
          key: el.header.publicId,
          value: el.resource.articleHeader.descriptor.title,
          subtitle: el.resource.articleHeader.descriptor.subtitle,
        };
        setSelectorOptions((selectorOptions) => [
          ...selectorOptions,
          newOption,
        ]);
      });
    }
  }, [area]);

  const sectionsInputValidationSchema = Yup.object({});

  const handleSubmit = (values) => {
    console.log(relatedArticles);

    onClose();
  };

  const handleOptionChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          alignSelf="center"
          paddingBottom={2}
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
        >
          Agregar a Secciones
        </ModalHeader>
        <ModalBody textAlign="center">
          <Formik
            validationSchema={sectionsInputValidationSchema}
            initialValues={sectionsList}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <>
                <Form>
                  <Tabs>
                    <TabList justifyContent="center">
                      <Tab
                        fontSize="sm"
                        width="12rem"
                        fontFamily="Open Sans"
                        paddingY={1}
                      >
                        Articulos relacionados
                      </Tab>
                      <Tab
                        fontSize="sm"
                        width="12rem"
                        fontFamily="Open Sans"
                        paddingY={1}
                      >
                        Para saber más
                      </Tab>
                      <Tab
                        fontSize="sm"
                        width="12rem"
                        fontFamily="Open Sans"
                        paddingY={1}
                      >
                        Para hacer
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <FieldArray name="relatedArticles">
                          {({ insert, remove, push }) => (
                            <>
                              {relatedArticles.map(
                                  (relatedArticle, index) => (
                                    <Field
                                      name={`relatedArticles.${index}.relatedArticle`}
                                    >
                                      {({ field, form }) => (
                                        <Stack p={6} bg="red">
                                          <Select
                                            placeholder="Elige un artículo"
                                            onChange={(e)=> {
                                              push("HOLA");
                                              console.log(e.target.value)
                                              console.log(sectionsList);
                                              return (<Text>"Subtitulo"</Text>)
                                            }}
                                          >
                                            {selectorOptions.map((option) => {
                                              return (
                                                <option
                                                  key={option.key}
                                                  value={option.key}
                                                >
                                                  {option.value}
                                                </option>
                                              );
                                            })}
                                          </Select>
                                        </Stack>
                                      )}
                                    </Field>
                                  )
                                )}
                            </>
                          )}
                        </FieldArray>
                      </TabPanel>

                      <TabPanel></TabPanel>
                    </TabPanels>
                  </Tabs>
                  <Flex justifyContent="center" paddingX={4}>
                    <Button
                      mt={4}
                      fontFamily="Poppins"
                      fontWeight="400"
                      colorScheme="blue"
                      type="submit"
                    >
                      Confirmar contenido
                    </Button>
                  </Flex>
                </Form>
              </>
            )}
          </Formik>
        </ModalBody>

        <ModalCloseButton />
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export { SectionsInputModal };
