import React from 'react';
import {
  Container,
  Stack,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Box,
  ButtonGroup
} from '@chakra-ui/react';
import { TiArrowSortedDown } from 'react-icons/ti';

const DeTodo = () => {
  const initialFocusRef = React.useRef();
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
          <Popover>
            <PopoverTrigger>
              <Button>Popver</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Pop Over!</PopoverHeader>
              <PopoverBody>Esto es un popover!</PopoverBody>
            </PopoverContent>
          </Popover>
          <Popover
            initialFocusRef={initialFocusRef}
            placement="bottom"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <Button>Otro popover</Button>
            </PopoverTrigger>
            <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Este es otro popover
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore.
              </PopoverBody>
              <PopoverFooter
                border="0"
                d="flex"
                alignItems="center"
                justifyContent="space-between"
                pb={4}
              >
                <Box fontSize="sm">Paso 2 de 4</Box>
                <ButtonGroup size="sm">
                  <Button colorScheme="green">Configurar Email</Button>
                  <Button colorScheme="blue" ref={initialFocusRef}>
                    Sig.
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Stack>
      </Stack>
    </Container>
  );
};

export { DeTodo };
