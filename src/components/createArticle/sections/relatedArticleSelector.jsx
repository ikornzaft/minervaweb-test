import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { VStack, HStack, Select, Text, Button } from '@chakra-ui/react';

import { DisplayRelatedArticle } from './displayRelatedArticle';

const RelatedArticleSelector = ({
  options,
  selectedArticles,
  setSelectedArticles,
  area,
}) => {
  const [articles, setArticles] = useState([]);
  const [articlesToDisplay, setArticlesToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const credentials = localStorage.getItem('credentials');
    const workgroups = JSON.parse(localStorage.getItem('userWorkgroups'));
    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/articles/handlers/FindArticles',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {
          workarea: {
            publicId: area,
          },
          workgroups: workgroups,
        },
      }),
    };

    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        setArticles(resJson.message.resources);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [area, setArticlesToDisplay]);

  useEffect(() => {
    articles.map((article) => {
      const newArticleToDisplay = {
        key: article.entity.publicId,
        value: article.contentHeader.descriptor.title,
      };
      setArticlesToDisplay((prevArticles) => [
        ...prevArticles,
        newArticleToDisplay,
      ]);
    });
  }, [articles]);

  // Creamos el estado optionValue
  // ¿es un array? No vamos a encontrar una propiedad relatedArticles
  const [optionValue, setOptionValue] = useState(
    selectedArticles.relatedArticles
  );

  // Chequeamos si una determinada opción ya fue elegida
  const checkSelectedArticles = (option) => {
    if (selectedArticles.length > 0) {
      const checked = selectedArticles.find(
        (article) => article.article.entity.publicId === option.key
      );
      if (checked) return true;
    }
    return false;
  };

  // Agregamos el artículo a selectedArticles
  const addArticle = () => {
    const articleIndex = articles.findIndex(
      (option) => option.entity.publicId === optionValue
    );
    if (articleIndex !== -1) {
      const articleObj = {
        descriptor: {
          title: articles[articleIndex].contentHeader.descriptor.title,
          subtitle: articles[articleIndex].contentHeader.descriptor.subtitle,
        },
        article: {
          type: 'article',
          entity: {
            publicId: articles[articleIndex].entity.publicId,
          },
        },
      };
      const elementExists = selectedArticles.findIndex(el => el.article.entity.publicId === optionValue)
      if (elementExists === -1) setSelectedArticles([...selectedArticles, articleObj]);
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
          {articlesToDisplay.map((option) => {
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
              options={articles}
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
