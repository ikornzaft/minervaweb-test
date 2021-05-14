import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Stack,
  Image,
  Heading,
  Container,
  Text,
  Badge,
  Divider,
} from '@chakra-ui/react';
import { LABELS } from '../locals/sp/labels';
import fallBackImg from '../assets/images/Online-Tutor.svg';

const Actividad = ({ articleId, title, subtitle, group, date, image }) => {
  const [badgeColor, setBadgeColor] = useState('');
  const articleLink = `/articulo/${articleId}`;
  useEffect(() => {
    if (group === 'Grupo 1') setBadgeColor('red');
    if (group === 'Grupo 2') setBadgeColor('green');
    if (group === 'Grupo 3') setBadgeColor('yellow');
  }, [group]);
  return (
    <Link to={articleLink}>
      <Stack
        backgroundColor="white"
        boxShadow="lg"
        width="50rem"
        padding={4}
        borderRadius="lg"
        justifyContent="space-evenly"
        alignItems="center"
        _hover={{bg: "gray.50"}}
      >
        <Stack
          width="100%"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          paddingX={8}
        >
          <Badge colorScheme={badgeColor}>{group}</Badge>
          <Text fontSize="sm">{date}</Text>
        </Stack>
        <Divider />
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          paddingY={2}
          paddingX={8}
        >
          <Image
            boxSize="125px"
            objectFit="cover"
            src={image}
            alt={LABELS.ACTIVIDADES.ACTIVIDAD.IMAGE_ALT}
            fallbackSrc={fallBackImg}
          />
          <Stack alignItems="flex-start">
            <Heading as="h3" size="md" marginLeft={4}>
              {title}
            </Heading>
            <Container textAlign="left">
              <Text>{subtitle}</Text>
            </Container>
          </Stack>
        </Stack>
      </Stack>
    </Link>
  );
};

export { Actividad };
