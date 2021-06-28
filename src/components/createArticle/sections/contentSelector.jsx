import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';

import { DisplayRelatedArticle } from './displayRelatedArticle';

const ContentSelector = ({
  type,
  options,
  selectedContent,
  setSelectedContent,
}) => {
  // Creamos el estado optionValue
  // ¿es un array? No vamos a encontrar una propiedad relatedArticles
  const [optionValue, setOptionValue] = useState([]);

  // Chequeamos si una determinada opción ya fue elegida
  const checkSelectedOption = (option) => {
    //if (selectedContent.length > 0) {
      //const checked = selectedContent.find((content) => content.article.entity.publicId === option.key);
      //if (checked) return true;
    //}
    return false;
  };

  

  const addContent = () => {
    const contentIndex = options.findIndex(
      (option) => option.key === optionValue
    );
    if (contentIndex !== -1) {
      const contentObj = {
        descriptor: {
          title: options[contentIndex].value,
          subtitle: options[contentIndex].subtitle,
        },
        article: {
          type: 'article',
          entity: {
            publicId: options[contentIndex].key,
          },
        },
      };
      setSelectedContent([...selectedContent, contentObj]);
    }
    setOptionValue(null);
  };


  // Agregamos el artículo a selectedArticles
  const addArticle = () => {
    const contentIndex = options.findIndex(
      (option) => option.key === optionValue
    );
    if (contentIndex !== -1) {
      const contentObj = {
        descriptor: {
          title: options[contentIndex].value,
          subtitle: options[contentIndex].subtitle,
        },
        article: {
          type: 'homework',
          entity: {
            publicId: options[contentIndex].key,
          },
        },
      };
      setSelectedContent([...selectedContent, contentObj]);
    }
    setOptionValue(null);
  };

  return (
    <VStack>
      <HStack className="form-control" paddingY={6}>
        <Select
          borderRadius="md"
          size="sm"
          placeholder="Seleccionar una tarea"
          onChange={(e) => {
            setOptionValue(e.target.value);
          }}
        >
          {options.map((option) => {
            if (!checkSelectedOption(option))
              return (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              );
          })}
        </Select>
        <Button
          type="button"
          w="15rem"
          variant="outline"
          fontFamily="Poppins"
          fontWeight="400"
          bgColor="white"
          colorScheme="blue"
          size="sm"
          onClick={addContent}
        >
          Agregar tarea
        </Button>
      </HStack>
      {selectedContent.map((article) => {
        if (article !== '')
          return (
            <DisplayRelatedArticle
              options={options}
              selectedContent={selectedContent}
              setSelectedContent={setSelectedContent}
              article={article}
            />
          );
      })}
    </VStack>
  );
};

export { ContentSelector };
