import React from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Image,
  Heading,
  Container,
  Text,
} from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';
import fallBackImg from '../assets/images/Online-Tutor.svg';

const ItemArticulo = ({ articleId, title, subtitle, image }) => {
  const articleLink = `/articulo/${articleId}`;
  return (
    <Link to={articleLink}>
      <Stack direction="row" backgroundColor="white" _hover={{bg:"gray.50"}}>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={image}
          alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
          fallbackSrc={fallBackImg}
        />
        <Stack direction="column">
          <Heading as="h3" size="sm" marginLeft={4} marginTop={4}>
            {title}
          </Heading>
          <Container textAlign="left">
            <Text fontSize="sm">{subtitle}</Text>
          </Container>
        </Stack>
      </Stack>
    </Link>
  );
};

export { ItemArticulo };
