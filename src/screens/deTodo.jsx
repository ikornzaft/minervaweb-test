import React from 'react';
import {
  Container,
  Stack,
  Heading,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { TiArrowSortedDown } from 'react-icons/ti';

const DeTodo = () => {
  return (
    <Container
      maxWidth="container.lg"
      alignSelf="center"
      backgroundColor="gray.50"
      padding="0px"
    >
    <Stack direction="column" textAlign="center">
    <Stack
    backgroundColor="gray.50"
    alignItems="center"
          padding={2}
          paddingBottom={8}
          spacing={6}
          >
          <Heading>De todo un poco</Heading>
          <Menu>
            <MenuButton as={Button} rightIcon={<TiArrowSortedDown />}>
              Un Menú
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
          </Stack>    
          </Stack>
          </Container>
          );
        };

export { DeTodo };
