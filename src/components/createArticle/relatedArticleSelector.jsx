import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';

import { DisplayRelatedArticle } from './displayRelatedArticle';

const RelatedArticleSelector = ({
  options,
  selectedArticles,
  setSelectedArticles,
}) => {
  console.log(options);

  const [optionValue, setOptionValue] = useState(null);

  const addArticle = () => {
    if (optionValue && optionValue !== '')
      setSelectedArticles([...selectedArticles, optionValue]);
    setOptionValue(null);
    console.log('Agregar ', selectedArticles);
  };

  return (
    <VStack>
      <HStack className="form-control">
        <Select
          borderRadius="md"
          size="sm"
          placeholder="Seleccionar un artículo"
          onChange={(e) => {
            console.log(e.target.value);
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
        <Button type="button" variant="primary" onClick={addArticle}>
          Agregar artículo
        </Button>
      </HStack>
      {selectedArticles.map((article) => {
        console.log(article);
        if (article !== '')
          return <DisplayRelatedArticle options={options} article={article} />;
      })}
    </VStack>
  );
};

export { RelatedArticleSelector };
