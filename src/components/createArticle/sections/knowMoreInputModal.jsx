import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
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
import { RelatedArticleSelector } from './relatedArticleSelector';
import { KnowMoreSelector } from './knowMoreSelector';
import { ArticlesDb } from '../../../resources/articlesDb';


const KnowMoreInputModal = ({
  isOpen,
  onClose,
  sectionsList,
  setSectionsList,
  area,
}) => {

  // Recibimos sectionsList y su setter
  // Verificamos si ya existen artículos dentro de sectionsList[0].contents
  // Si hay, los agregamos a relatedArticlesArray
  let relatedArticlesArray;
  if (sectionsList[0].contents.length > 0) {
    console.log("ya hay articulos")
    const filteredContent = sectionsList[0].contents.filter(el => el.article);
    relatedArticlesArray = filteredContent;
  } else {
    console.log("todavía no hay artículos")
    relatedArticlesArray = [];
  }

  // Creamos el estado selectedArticles
  // Es un array que va a contener los objetos que creemos como artículos relacionados
  const [selectedArticles, setSelectedArticles] = useState(
    relatedArticlesArray
  );

  const [knowMore, setKnowMore] = useState([sectionsList.knowMore]);

  // ???
  const [areaArticles, setAreaArticles] = useState([]);

  // Las opciones para el input selector
  // Es un array por ahora vacío
  // Después tendrá objetos con propiedades: key, value(título), subtitle
  const [selectorOptions, setSelectorOptions] = useState([]);

  /*   useEffect(() => {
    setSelectedArticles(sectionsList.relatedArticles)
  }, [sectionsList]) */

  // Cada vez que seleccionamos una nueva workarea, este código se ejecuta
  // Nos trae todo los artículos (si existen) de esa área
  // y con cada uno crea un objeto newOption, que se lo añade a selectorOption
  useEffect(() => {
    const articles = ArticlesDb.filter((e) => e.workArea === area);
    setSelectorOptions([]);

    // Para qué?
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

  // Al enviar añadimos a sectionsList el contenido de selectedArticles
  const handleSubmit = (values) => {
    setSectionsList((sectionsList) => ({
      ...sectionsList,
      relatedArticles: selectedArticles,
      knowMore: knowMore,
    }));
    console.log(knowMore)
    setSelectedArticles([]);
    setKnowMore([]);
    onClose();
  };

  const handleOptionChange = (e) => {
    console.log(e.target.value);
  };

  // Acá le vamos a pasar al componente RelatedArticleSelector las propiedades:
  // selectorOptions
  // selectedArticles
  // setSelectedArticles
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
          Para saber más...
        </ModalHeader>
        <ModalBody textAlign="center">
          <Formik initialValues={sectionsList} onSubmit={handleSubmit}>
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
                        Articulos
                      </Tab>
                      <Tab
                        fontSize="sm"
                        width="12rem"
                        fontFamily="Open Sans"
                        paddingY={1}
                      >
                        Archivos
                      </Tab>
                      <Tab
                        fontSize="sm"
                        width="12rem"
                        fontFamily="Open Sans"
                        paddingY={1}
                      >
                        Links
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <RelatedArticleSelector
                          options={selectorOptions}
                          selectedArticles={selectedArticles}
                          setSelectedArticles={setSelectedArticles}
                        />
                      </TabPanel>

                      <TabPanel>
                        <KnowMoreSelector knowMore={knowMore} setKnowMore={setKnowMore} />
                      </TabPanel>
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

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export { KnowMoreInputModal };
