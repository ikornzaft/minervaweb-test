import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';

import { DisplayRelatedArticle } from './displayRelatedArticle';

const RelatedArticleSelector = ({
  options,
  selectedArticles,
  setSelectedArticles,
}) => {
  const [optionValue, setOptionValue] = useState(
    selectedArticles.relatedArticles
  );

  const addArticle = () => {
    if (optionValue && optionValue !== '')
      setSelectedArticles([...selectedArticles, optionValue]);
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
            if (!selectedArticles.find((article) => article === option.key))
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
