import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Input,
} from '@chakra-ui/react';

const GenericDrawer = ({
  placement,
  isOpen,
  onClose,
  finalFocus,
  title,
  inputPlaceholder,
  firstButton,
  secondButton,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement={placement}
      onClose={onClose}
      finalFocusRef={finalFocus}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody>
          <Input placeholder={inputPlaceholder} />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            {firstButton}
          </Button>
          <Button colorScheme="blue">{secondButton}</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { GenericDrawer };
