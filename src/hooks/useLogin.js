import * as React from 'react';
import * as emailValidator from 'email-validator';

// import { authService, localStorageService } from "../../services";

const validateEmail = emailValidator.validate;

const useLogin = () => {
  const [error, setError] = React.useState('');
  const [validUser, setValidUser] = React.useState(false);
  const [tryNumber, setTryNumber] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const attempt = tryNumber + 1;
    setTryNumber(attempt);

    if (!email || !validateEmail(email) || email.length < 8) {
      setError('No es un email válido');
      return;
    }
    if (!password || password.length < 8) {
      setError('El password no es válido');
      return;
    }

    try {
      /* const res = await authService.login({ email, password });
      if (res && res.data && res.data.token) {
        localStorageService.AddUser({ email, token: res.data.token });
        history.push("/admin/dashboard");
      } */
      if (email === 'ikornzaft@gmail.com' && password === '123456789') {
        setValidUser(true);
        setError('');
        return;
      }
    } catch (e) {
      switch (e.response.status) {
        case 401:
          setError('El password es incorrecto');
          break;
        case 400:
          setError('Por favor, completar la totalidad de los datos.');
          break;
        case 404:
          setError(`${email} no está registrado.`);
          break;
        case 500:
          setError('Problemas técnicos. Por favor intentar nuevamente.');
          break;
        default:
          setError('Problemas con la conexión');
      }
    }
  };
  return { handleSubmit, validUser, tryNumber, error };
};

export { useLogin };
