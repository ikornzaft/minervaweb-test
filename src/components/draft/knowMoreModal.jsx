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

import { RelatedArticleSelector } from '../createArticle/sections/relatedArticleSelector';
import { KnowMoreSelector } from '../createArticle/sections/knowMoreSelector';
import { KnowMoreLinkSelector } from '../createArticle/sections/knowMoreLinkSelector';
import { AREAS } from '../../locals/sp/areas';

const KnowMoreModal = ({ isOpen, onClose, draftKnowMore, setDraftKnowMore, area }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [knowMore, setKnowMore] = useState([]);
  const [knowMoreLinks, setKnowMoreLinks] = useState([]);
  const [workAreas, setWorkAreas] = useState([
    { key: AREAS.area_1.tag, value: AREAS.area_1.route },
    { key: AREAS.area_2.tag, value: AREAS.area_2.route },
    { key: AREAS.area_3.tag, value: AREAS.area_3.route },
    { key: AREAS.area_4.tag, value: AREAS.area_4.route },
  ]);

  useEffect(() => {
    if (localStorage.getItem('isResearcher') === 'true') {
      const researchArea = {
        key: 'Investigación',
        value: 'research',
      };

      setWorkAreas([...workAreas, researchArea]);
    }
  }, []);

  useEffect(() => {
    const contents = draftKnowMore.filter((el) => el.content);
    const files = contents.filter((el) => el.content.link.type !== 'link');
    const links = contents.filter((el) => el.content.link.type === 'link');

    setKnowMore(files);
    setKnowMoreLinks(links);
  }, []);

  useEffect(() => {
    const articles = draftKnowMore.filter((el) => el.article);

    setRelatedArticles(articles);
  }, []);

  const handleSubmit = (values) => {
    const concatArray = relatedArticles.concat(knowMore, knowMoreLinks);

    setDraftKnowMore(concatArray);
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
          Para saber más...
        </ModalHeader>
        <ModalBody textAlign="center">
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
                  selectedArticles={relatedArticles}
                  setSelectedArticles={setRelatedArticles}
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
              onClick={handleSubmit}
            >
              Confirmar contenido
            </Button>
          </Flex>
        </ModalBody>
        <ModalCloseButton />
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export { KnowMoreModal };
