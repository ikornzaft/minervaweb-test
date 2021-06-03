import React from 'react';
import { FormControl, Image, FormLabel, Input } from '@chakra-ui/react';

const ImageMultipleInput = ({fieldProps, formProps, thumbnails, setThumbnails, index, fileInputRef}) => {
  return (
    <FormControl
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      {thumbnails[index] ? (
        <Image
          src={thumbnails[index]}
          w="120px"
          h="120px"
          borderStyle="dashed"
          borderColor="gray.400"
          borderRadius="lg"
          borderWidth="2px"
          objectFit="cover"
          onClick={() => {
            fileInputRef.current.click();
          }}
        />
      ) : (
        <FormLabel
          htmlFor={`images.${index}.image`}
          bgColor="gray.200"
          w="120px"
          h="120px"
          borderStyle="dashed"
          borderWidth="2px"
          borderRadius="lg"
          borderColor="gray.400"
          textAlign="center"
          p={6}
          marginBottom={0}
          marginRight={0}
          fontSize="sm"
          onClick={(e) => {
            fileInputRef.current.click();
          }}
        >
          Click para agregar imágen {index + 1}
        </FormLabel>
      )}

      <Input
        type="file"
        id="image"
        display="none"
        accept="image/*"
        ref={fileInputRef}
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substring(0, 5) === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
              const readerResult = reader.result;

              formProps.setFieldValue(`images.${index}.image`, readerResult);
              setThumbnails((prev) => [...prev, readerResult]);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </FormControl>
  );
};

export { ImageMultipleInput };
