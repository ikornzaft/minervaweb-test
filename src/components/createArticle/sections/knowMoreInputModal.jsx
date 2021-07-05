import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import { RelatedArticleSelector } from './relatedArticleSelector';
import { KnowMoreSelector } from './knowMoreSelector';
import { KnowMoreLinkSelector } from './knowMoreLinkSelector';
import { ArticlesDb } from '../../../resources/articlesDb';

const KnowMoreInputModal = ({
  isOpen,
  onClose,
  sectionsList,
  setSectionsList,
  selectedArticles,
  setSelectedArticles,
  knowMore,
  setKnowMore,
  knowMoreLinks,
  setKnowMoreLinks,
  area,
}) => {
  const [selectorOptions, setSelectorOptions] = useState([]);

  useEffect(() => {
    const articles = ArticlesDb.filter((e) => e.workArea === area);
    setSelectorOptions([]);

    if (articles.length > 0) {
      articles.forEach((el) => {
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

  const handleSubmit = (values) => {
    const concatArray = selectedArticles.concat(knowMore, knowMoreLinks);
    const newList = [...sectionsList];
    newList[0].contents = concatArray;
    setSectionsList(newList);
    onClose();
  };

  const handleOptionChange = (e) => {};

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
                          area={area}
                          options={selectorOptions}
                          selectedArticles={selectedArticles}
                          setSelectedArticles={setSelectedArticles}
                        />
                      </TabPanel>

                      <TabPanel>
                        <KnowMoreSelector
                          knowMore={knowMore}
                          setKnowMore={setKnowMore}
                        />
                      </TabPanel>

                      <TabPanel>
                        <KnowMoreLinkSelector
                          knowMoreLinks={knowMoreLinks}
                          setKnowMoreLinks={setKnowMoreLinks}
                        />
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
