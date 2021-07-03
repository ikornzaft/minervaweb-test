import React, { useState, useEffect } from 'react';
import {
  VStack,
  Text,
  Stack,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Input,
} from '@chakra-ui/react';
import { EditElementFormText } from './editElementFormText';
import { EditElementFormFile } from './editElementFormFile';
import { EditElementFormLink } from './editElementFormLink';
import { LABELS } from '../../../locals/sp/labels';

const EditElementForm = ({
  paragraphList,
  setParagraphList,
  elementId,
  onCancel,
  forceRender,
  setForceRender,
  isImage,
}) => {

  let currentElement = {};

  const [textParagraph, setTextParagraph] = useState('');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [location, setLocation] = useState('');
  const [locationType, setlocationType] = useState('');
  const [type, setType] = useState('');
  const [typeOfResource, setTypeOfResource] = useState('');

  useEffect(() => {
    if (paragraphList[elementId].content) {
      setDescription(paragraphList[elementId].descriptor.title);
      setFileName(paragraphList[elementId].descriptor.subtitle);
      setLocation(paragraphList[elementId].content.link.location);
      setType(paragraphList[elementId].content.link.type);
      setlocationType('relative')
      setTypeOfResource('file')
      if (paragraphList[elementId].content.link.type === 'link') {
        setTypeOfResource('link')
        setlocationType('absolute')
        setType('link')
      }
    } else {
      setTypeOfResource('text')
      setTextParagraph(paragraphList[elementId].descriptor.description);
    }
  }, [paragraphList]);

  const handleCancel = () => {
    currentElement = {};
    if (paragraphList[elementId].content) {
      setDescription(paragraphList[elementId].descriptor.title);
      setFileName(paragraphList[elementId].descriptor.subtitle);
      setLocation(paragraphList[elementId].content.link.location);
      setType(paragraphList[elementId].content.link.type);
    } else {
      setTextParagraph(paragraphList[elementId].descriptor.description);
    }
    onCancel();
  };
  const handleSubmit = () => {
    if (paragraphList[elementId].content) {
      currentElement = {
        descriptor: {
          subtitle: fileName,
          title: description,
        },
        content: {
          link: {
            locationType: locationType,
            location: location,
            type: type,
          },
        },
      };
    } else {
      currentElement = {
        descriptor: {
          description: textParagraph,
        },
      };
    }

    setParagraphList((prevState) => {
      const newState = [...prevState];
      newState[elementId] = currentElement;
      console.log(newState);
      return newState;
    });
    onCancel();
  };

  const renderForm = () => {
    if (typeOfResource === 'link') {
        return (
          <EditElementFormLink
          title={description}
          setTitle={setDescription}
          subtitle={fileName}
          setSubtitle={setFileName}
          location={location}
          setLocation={setLocation}
          />
        );
      }
    if (typeOfResource === 'file') {
        return (
          <EditElementFormFile
            description={description}
            setDescription={setDescription}
            fileName={fileName}
            setFileName={setFileName}
            location={location}
            setLocation={setLocation}
            type={type}
            setType={setType}
          />
        );
      }
    if (typeOfResource === 'text') {
      return (
        <EditElementFormText
          textParagraph={textParagraph}
          setTextParagraph={setTextParagraph}
        />
      );
    }
  };

  return (
    <VStack justifyContent="space-between" w="100%" h="100%">
      <Text>{LABELS.CREATE_ARTICLE.EDIT_PARAGRAPHS.MODAL_TITLE}</Text>
      {renderForm()}
      <ButtonGroup d="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSubmit}>
          Modificar
        </Button>
      </ButtonGroup>
    </VStack>
  );
};

export { EditElementForm };
