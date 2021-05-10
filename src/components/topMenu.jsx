import React from 'react';
import {
  Stack,
  Container,
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
  Input,
} from '@chakra-ui/react';

const TopMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenRight, onOpen: onOpenRight, onClose: onCloseRight } = useDisclosure();
  const btnRef1 = React.useRef();
  const btnRef2 = React.useRef();
  return (
    <Stack alignSelf="center" width="100%">
      <Flex backgroundColor="gray.200">
        <Box p="2" paddingLeft="6">
          <Button ref={btnRef1} colorScheme="teal" onClick={onOpen}>
            Open
          </Button>
        </Box>
        <Spacer />
        <Box p="2">
          <Button colorScheme="teal" mr="4">
            Opcion1
          </Button>
          <Button colorScheme="teal" mr="4">
            Opcion2
          </Button>
          <Button colorScheme="teal" mr="4">
            Opcion3
          </Button>
        </Box>
        <Spacer />
        <Box p="2" paddingRight="6">
          <Button ref={btnRef2} colorScheme="teal" onClick={onOpenRight}>
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