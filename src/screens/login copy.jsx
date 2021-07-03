import React, { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useHistory } from 'react-router-dom';
import {LABELS} from '../locals/sp/labels';

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
  TiUserOutline,
  TiLockClosedOutline,
  TiEyeOutline,
  TiEye,
} from 'react-icons/ti';

const Login = ({ isLoginOn, setLoginOn }) => {
  const history = useHistory();
  const { handleSubmit, validUser, tryNumber, error } = useLogin();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = password === "" || user === "";
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
      history.push('/activities/');
    }
  }, [validUser, history, isLoginOn, setLoginOn]);

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Stack
        alignSelf="center"
        textAlign="center"
        rounded="lg"
        bg="white"
        boxShadow="2xl"
        maxWidth={500}
        spacing={5}
        margin="auto"
        marginTop={16}
        marginBottom={16}
        padding={5}
      >
        <Heading color="primary" padding={5} fontWeight="400">
          {LABELS.LOGIN.TITLE}
        </Heading>
        <FormControl>
          <FormLabel fontSize="sm" htmlFor="user">
            {LABELS.LOGIN.FORM.USER_LABEL}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              fontSize="xl"
              children={<TiUserOutline color="gray" />}
            />
            <Input
              isRequired
              autofocus="true"
              fontSize="sm"
              type="text"
              id="user"
              placeholder={LABELS.LOGIN.FORM.USER_PLACEHOLDER}
              errorBorderColor="red.300"
              value={user}
              onChange={({ target }) => setUser(target.value)}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm" htmlFor="password">
            {LABELS.LOGIN.FORM.PASS_LABEL}
          </FormLabel>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              fontSize="xl"
              children={
                <TiLockClosedOutline color="gray" />
              }
            />
            <Input
              isRequired
              fontSize="sm"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              errorBorderColor="red.300"
              id="password"
              placeholder={LABELS.LOGIN.FORM.PASS_PLACEHOLDER}
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
            variant="primary"
            disabled={isInvalid}
            margin="5"
          >
            {LABELS.LOGIN.BUTTON_TEXT}
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export { Login };