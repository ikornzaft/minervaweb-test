import * as React from 'react';
import * as emailValidator from 'email-validator';
import { LABELS } from '../locals/sp/labels';

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
      setError(LABELS.LOGIN.MESSAGES.ERROR.INVALID_EMAIL);
      return;
    }
    if (!password || password.length < 5) {
      setError(LABELS.LOGIN.MESSAGES.ERROR.INVALID_PASS);
      return;
    }

    try {
      /* const res = await authService.login({ email, password });
      if (res && res.data && res.data.token) {
        localStorageService.AddUser({ email, token: res.data.token });
        history.push("/admin/dashboard");
      } */
      if (email === 'admin@admin.com' && password === 'admin') {
        setValidUser(true);
        setError('');
        return;
      }
    } catch (e) {
      switch (e.response.status) {
        case 401:
          setError(LABELS.LOGIN.MESSAGES.ERROR.WRONG_PASS);
          break;
        case 400:
          setError(LABELS.LOGIN.MESSAGES.ERROR.INCOMPLETE_DATA);
          break;
        case 404:
          setError(`${email} ${LABELS.LOGIN.MESSAGES.ERROR.UNREGISTED_EMAIL}`);
          break;
        case 500:
          setError(LABELS.LOGIN.MESSAGES.ERROR.TECHNICAL_ISSUES);
          break;
        default:
          setError(LABELS.LOGIN.MESSAGES.ERROR.CONNECTION);
      }
    }
  };
  return { handleSubmit, validUser, tryNumber, error };
};

export { useLogin };
