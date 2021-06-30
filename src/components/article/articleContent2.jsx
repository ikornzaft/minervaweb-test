import React, { useRef, useState, useEffect } from 'react';
import {
  Stack,
  Image,
  Heading,
  Container,
  Text,
  Box,
  Badge,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { ParagraphPopover } from './paragraphPopover';
import fallBackImg from '../../assets/images/Online-Tutor.svg';
import { CreateAreaBadge } from '../common/createAreaBadge';
import { SectionsList } from '../article/sectionsList';
import { ParagraphItemDisplay } from './paragraphItemDisplay';
import { LABELS } from '../../locals/sp/labels';

const ArticleContent = ({ article, requests, setRequests}) => {

  const [coverImage, setCoverImage] = useState("");
  const [coverImageFooter, setCoverImageFooter] = useState("");
  const [articleDate, setArticleDate] = useState(null);
  const [badge, setBadge] = useState(null);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  useEffect(() => {
    console.log(article)
    setCoverImage(article.resource.articleHeader.image.location);
    setCoverImageFooter(article.resource.articleHeader.image.descriptor.title);
    setArticleDate(article.logs.inserted.timestamp);
    CreateAreaBadge("mate")

  }, [article])
  

  return (
    <>
    <div>HOLA</div>
    <Image src={coverImage}></Image>
    </>
  )
};

export { ArticleContent };
