import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
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
  workAreas,
  prevArticle,
  title,
}) => {
  const [selectorOptions, setSelectorOptions] = useState([]);

  useEffect(() => {
    if (prevArticle) {
      const articleObj = {
        descriptor: {
          title: prevArticle.resource.articleHeader.descriptor.title,
          subtitle: prevArticle.resource.articleHeader.descriptor.subtitle,
        },
        article: {
          type: 'article',
          entity: {
            publicId: prevArticle.header.publicId,
          },
        },
      };

      setSelectedArticles([articleObj]);
    }
  }, []);

  const handleSubmit = (values) => {
    const concatArray = selectedArticles.concat(knowMore, knowMoreLinks);
    const newList = [...sectionsList];

    newList[0].contents = concatArray;
    setSectionsList(newList);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          alignSelf="center"
          color="gray.700"
          fontFamily="Poppins"
          fontWeight="300"
          paddingBottom={2}
        >
          {title}
        </ModalHeader>
        <ModalBody textAlign="center">
          <Formik initialValues={sectionsList} onSubmit={handleSubmit}>
            {(formikProps) => (
              <>
                <Form>
                  <Tabs>
                    <TabList justifyContent="center">
                      <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                        Articulos
                      </Tab>
                      <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
                        Archivos
                      </Tab>
                      <Tab fontFamily="Open Sans" fontSize="sm" paddingY={1} width="12rem">
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
                          workAreas={workAreas}
                        />
                      </TabPanel>

                      <TabPanel>
                        <KnowMoreSelector knowMore={knowMore} setKnowMore={setKnowMore} />
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
                      colorScheme="blue"
                      fontFamily="Poppins"
                      fontWeight="400"
                      mt={4}
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

export { KnowMoreInputModal };
