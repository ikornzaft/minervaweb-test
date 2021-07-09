import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Button,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { FilesSelector } from './filesSelector';
import { ArticleContentLinkSelector } from './articleContentLinkSelector';
import { LABELS } from '../../../locals/sp/labels';

const ArticleContentInputModal = ({
  isOpen,
  onClose,
  paragraphList,
  setParagraphList,
}) => {
  const [articleContent, setArticleContent] = useState([]);
  const [articleContentLinks, setArticleContentLinks] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const articleContentValidationSchema = Yup.object({});

  const handleSubmit = (values) => {
    let paragraphsToSubmit = [];

    if (values.textContent) {
      const paragraphs = values.textContent.split(/\n\s*\n/);
       paragraphsToSubmit = paragraphs.filter(el => el !== "").map((el) => {
        const obj = {
          descriptor: {
            description: el,
          },
        };
          return obj;
      }); 
    }

    uploadedFiles.length > 0
      ? setParagraphList((paragraphList) => [
          ...paragraphList,
          ...paragraphsToSubmit.concat(uploadedFiles),
        ])
      : setParagraphList((paragraphList) => [
          ...paragraphList,
          ...paragraphsToSubmit,
        ]);

    if (articleContentLinks.length > 0)
      setParagraphList((paragraphList) => [
        ...paragraphList,
        ...articleContentLinks,
      ]);

    setUploadedFiles([]);
    setArticleContentLinks([]);
    onClose();
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
          Agregar contenido
        </ModalHeader>
        <ModalBody textAlign="center">
          <Formik
            validationSchema={articleContentValidationSchema}
            initialValues={articleContent}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <>
                <Form>
                  <Tabs>
                    <TabList>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        {LABELS.CREATE_ARTICLE.PARAGRAPHS.TABS.TITLE_1}
                      </Tab>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        {LABELS.CREATE_ARTICLE.PARAGRAPHS.TABS.TITLE_2}
                      </Tab>
                      <Tab fontSize="sm" fontFamily="Open Sans" paddingY={1}>
                        {LABELS.CREATE_ARTICLE.PARAGRAPHS.TABS.TITLE_3}
                      </Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>
                        <Field name="textContent">
                          {({ field }) => (
                            <FormControl>
                              <FormLabel
                                fontSize="sm"
                                marginTop={4}
                                htmlFor="textContent"
                                fontFamily="Open Sans"
                              >
                                {LABELS.CREATE_ARTICLE.PARAGRAPHS.TAB_1.LABEL}
                              </FormLabel>
                              <Textarea
                                fontSize="sm"
                                height={32}
                                {...field}
                                id="textContent"
                                placeholder={
                                  LABELS.CREATE_ARTICLE.PARAGRAPHS.TAB_1
                                    .PLACEHOLDER
                                }
                              />
                            </FormControl>
                          )}
                        </Field>
                      </TabPanel>

                      <TabPanel>
                        <FilesSelector
                          uploadedFiles={uploadedFiles}
                          setUploadedFiles={setUploadedFiles}
                        />
                      </TabPanel>

                      <TabPanel>
                        <ArticleContentLinkSelector
                          articleContentLinks={articleContentLinks}
                          setArticleContentLinks={setArticleContentLinks}
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
                      {LABELS.CREATE_ARTICLE.PARAGRAPHS.SUBMIT_BUTTON}
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

export { ArticleContentInputModal };
