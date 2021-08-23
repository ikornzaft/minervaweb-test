import React, { useState, useEffect } from 'react';
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
import { TiUserOutline, TiLockClosedOutline, TiEyeOutline, TiEye } from 'react-icons/ti';

import { LABELS } from '../locals/sp/labels';

const Login = ({ isLoginOn, setLoginOn }) => {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = password === '' || user === '';
  const [error, setError] = useState(null);
  const [validUser, setValidUser] = useState(false);
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
  }, [error, toast]);

  useEffect(() => {
    if (validUser) {
      setLoginOn(true);
      localStorage.getItem('isStudent') === 'true'
        ? history.push('/activities/')
        : history.push('/requests-board/');
    }
  }, [validUser, history, isLoginOn, setLoginOn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const buf = Buffer.from(password);
    const credentials = user + ':' + buf.toString('base64');

    const jsonMessage = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        id: 'msgid-1',
        target: 'soa@service/minerva',
        method: 'mods/workgroups/handlers/Login',
        requester: 'root:YWNhY2lhITIwMTc=',
        principal: credentials,
        message: {},
      }),
    };

    async function fetchData() {
      try {
        const res = await fetch(url, jsonMessage);

        if (res.status >= 400 && res.status < 600) setError('Bad response from server');
        const resJson = await res.json();

        if (resJson.response === 0) {
          setValidUser(true);
          localStorage.setItem('credentials', credentials);
          localStorage.setItem(
            'userWorkgroups',
            JSON.stringify(resJson.message.entity.resource.workgroups)
          );
          localStorage.setItem('workgroups', JSON.stringify(resJson.message.workgroups));
          localStorage.setItem('userName', resJson.message.entity.resource.username);
          localStorage.setItem('isStudent', resJson.message.entity.resource.student);
          localStorage.setItem('isEditor', resJson.message.entity.resource.editor);
          localStorage.setItem('isResearcher', resJson.message.entity.resource.researcher);
          localStorage.setItem('realName', resJson.message.entity.resource.descriptor.title);
        } else {
          setError(resJson.error.text);
        }
        // save user data to localstorage
      } catch (err) {
        setError(err);
      }
    }
    fetchData();
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <Stack
        alignSelf="center"
        bg="white"
        boxShadow="2xl"
        margin="auto"
        marginBottom={16}
        marginTop={16}
        maxWidth={500}
        padding={5}
        rounded="lg"
        spacing={5}
        textAlign="center"
      >
        <Heading color="primary" fontWeight="400" padding={5}>
          {LABELS.LOGIN.TITLE}
        </Heading>
        <FormControl>
          <FormLabel fontSize="sm" htmlFor="user">
            {LABELS.LOGIN.FORM.USER_LABEL}
          </FormLabel>
          <InputGroup>
            <InputLeftElement fontSize="xl" pointerEvents="none">
              <TiUserOutline color="gray" />
            </InputLeftElement>
            <Input
              isRequired
              autoFocus={true}
              errorBorderColor="red.300"
              fontSize="sm"
              id="user"
              placeholder={LABELS.LOGIN.FORM.USER_PLACEHOLDER}
              type="text"
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
            <InputLeftElement fontSize="xl" pointerEvents="none">
              <TiLockClosedOutline color="gray" />
            </InputLeftElement>
            <Input
              isRequired
              autoComplete="off"
              errorBorderColor="red.300"
              fontSize="sm"
              id="password"
              placeholder={LABELS.LOGIN.FORM.PASS_PLACEHOLDER}
              type={showPassword ? 'text' : 'password'}
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
            colorScheme="blue"
            disabled={isInvalid}
            fontSize="sm"
            margin="5"
            type="submit"
            variant="primary"
          >
            {LABELS.LOGIN.BUTTON_TEXT}
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export { Login };
