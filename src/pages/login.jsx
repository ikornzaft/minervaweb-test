import React, { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useHistory } from 'react-router-dom';

import {
  Stack,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

import {
  TiMail,
  TiLockClosedOutline,
  TiEyeOutline,
  TiEye,
} from 'react-icons/ti';

const Login = ({ isLoginOn, setLoginOn }) => {
  const history = useHistory();
  const { handleSubmit, validUser, tryNumber, error } = useLogin();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = password === "" || emailAddress === "";
  const toast = useToast();

  useEffect(() => {
    if (error && error.length) {
      toast({
        title: error,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error, tryNumber, toast]); 

  useEffect(() => {
    if (validUser) {
      setLoginOn(!isLoginOn);
      history.push('/feed/');
    }
  }, [validUser]);

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Stack
        alignSelf="center"
        textAlign="center"
        boxShadow="md"
        rounded="lg"
        bg="gray.50"
        maxWidth={500}
        spacing={5}
        margin="auto"
        marginTop={16}
        marginBottom={16}
        padding={5}
      >
        <Heading color="blue.400" padding={5}>
          Nombre de la App
        </Heading>
        <FormControl>
          <FormLabel fontSize="sm" htmlFor="email">
            Dirección de email
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              fontSize="xl"
              children={<TiMail color="gray" />}
            />
            <Input
              isRequired
              fontSize="sm"
              type="email"
              id="email"
              placeholder="mail@dominio.com"
              errorBorderColor="red.300"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm" htmlFor="password">
            Password
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              fontSize="xl"
              children={
                <TiLockClosedOutline verticalAlign="middle" color="gray" />
              }
            />
            <Input
              isRequired
              fontSize="sm"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              errorBorderColor="red.300"
              id="password"
              placeholder="********"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                icon={showPassword ? <TiEye /> : <TiEyeOutline />}
                isRound="true"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl padding={2}>
          <Button
            fontSize="sm"
            colorScheme="blue"
            type="submit"
            disabled={isInvalid}
            margin="5"
          >
            Ingresar
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export { Login };
