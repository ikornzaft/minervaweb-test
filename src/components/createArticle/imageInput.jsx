import React, { useRef, useState } from 'react';
import { FormControl, Image, FormLabel, Input } from '@chakra-ui/react';

const ImageInput = ({fieldProps, formProps, index }) => {
  const imgInputRef = useRef();
  const [thumbnails, setThumbnails] = useState(null);

  return (
    <FormControl
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
    {thumbnails ? (
      <Image
        src={thumbnails}
        boxSize="150px"
        borderStyle="dashed"
        borderColor="gray.400"
        borderRadius="lg"
        borderWidth="2px"
        objectFit="cover"
        onClick={() => {
          imgInputRef.current.click();
        }}
      />
    ) : (
      <FormLabel
        htmlFor={'articleImg'}
        bgColor="gray.200"
        boxSize="150px"
        borderStyle="dashed"
        borderWidth="2px"
        borderRadius="lg"
        borderColor="gray.400"
        textAlign="center"
        paddingY={12}
        paddingX={4}
        marginBottom={0}
        marginRight={0}
        fontSize="sm"
        _hover={{ bgColor: 'gray.300' }}

        cursor="pointer"
        onClick={(e) => {
          imgInputRef.current.click();
        }}
      >
        Agregar imágen principal
      </FormLabel>
    )}
      <Input
        type="file"
        id="articleImg"
        display="none"
        accept="image/*"
        ref={imgInputRef}
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substring(0, 5) === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
              const readerResult = reader.result;
              
              formProps.setFieldValue(fieldProps.name, readerResult);
              setThumbnails(readerResult);
              
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </FormControl>
  );
};

export { ImageInput };
