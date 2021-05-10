import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Stack,
  Flex,
  Box,
  Spacer,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input
} from '@chakra-ui/react';

const TopMenu = () => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenRight,
    onOpen: onOpenRight,
    onClose: onCloseRight,
  } = useDisclosure();
  const btnRef1 = React.useRef();
  const btnRef2 = React.useRef();
  const menuHandler = (e) => {
    if (e.target.id === 'feedBtn') history.push('/feed/');
    if (e.target.id === 'formBtn') history.push('/form/');
    if (e.target.id === 'mixBtn') history.push('/mix/');
    if (e.target.id === 'deTodoBtn') history.push('/detodo/');
  };
  return (
    <Stack alignSelf="center" width="100%">
      <Flex backgroundColor="gray.200">
        <Box p="2" paddingLeft="6">
          <Button ref={btnRef1} colorScheme="blue" onClick={onOpen}>
            Open
          </Button>
        </Box>
        <Spacer />
        <Box p="2">
          <Button colorScheme="blue" mr="4" id="feedBtn" onClick={menuHandler}>
            Feed
          </Button>
          <Button colorScheme="blue" mr="4" id="formBtn" onClick={menuHandler}>
            Form Cualquiera
          </Button>
          <Button colorScheme="blue" mr="4" id="mixBtn" onClick={menuHandler}>
            Links y Botones
          </Button>
          <Button
            colorScheme="blue"
            mr="4"
            id="deTodoBtn"
            onClick={menuHandler}
          >
            De todo un poco
          </Button>

        </Box>
        <Spacer />
        <Box p="2" paddingRight="6">
          <Button ref={btnRef2} colorScheme="blue" onClick={onOpenRight}>
            Open
          </Button>
        </Box>

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef1}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Otro drawer</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer
          isOpen={isOpenRight}
          placement="right"
          onClose={onCloseRight}
          finalFocusRef={btnRef2}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Otro drawer</DrawerHeader>

            <DrawerBody>
              <Input placeholder="Type here..." />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Stack>
  );
};

export { TopMenu };
