import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';

import { DisplayRelatedArticle } from './displayRelatedArticle';

const RelatedArticleSelector = ({
  options,
  selectedArticles,
  setSelectedArticles,
}) => {
  // Creamos el estado optionValue
  // ¿es un array? No vamos a encontrar una propiedad relatedArticles
  const [optionValue, setOptionValue] = useState(
    selectedArticles.relatedArticles
  );

  // Chequeamos si una determinada opción ya fue elegida
  const checkSelectedArticles = (option) => {
    if (selectedArticles.length > 0) {
      const checked = selectedArticles.find((article) => article.article.entity.publicId === option.key);
      if (checked) return true;
    }
    return false;
  };

  // Agregamos el artículo a selectedArticles
  const addArticle = () => {
    const articleIndex = options.findIndex(
      (option) => option.key === optionValue
    );
    if (articleIndex !== -1) {
      const articleObj = {
        descriptor: {
          title: options[articleIndex].value,
          subtitle: options[articleIndex].subtitle,
        },
        article: {
          type: 'article',
          entity: {
            publicId: options[articleIndex].key,
          },
        },
      };
      setSelectedArticles([...selectedArticles, articleObj]);
    }
    setOptionValue(null);
  };

  return (
    <VStack>
      <HStack className="form-control" paddingY={6}>
        <Select
          borderRadius="md"
          size="sm"
          placeholder="Seleccionar un artículo"
          onChange={(e) => {
            setOptionValue(e.target.value);
          }}
        >
          {options.map((option) => {
            if (!checkSelectedArticles(option))
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
          onClick={addArticle}
        >
          Agregar artículo
        </Button>
      </HStack>
      {selectedArticles.map((article) => {
        if (article !== '')
          return (
            <DisplayRelatedArticle
              options={options}
              selectedArticles={selectedArticles}
              setSelectedArticles={setSelectedArticles}
              article={article}
            />
          );
      })}
    </VStack>
  );
};

export { RelatedArticleSelector };
