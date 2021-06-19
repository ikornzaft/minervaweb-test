import * as React from 'react';
import { LABELS } from '../locals/sp/labels';

// import { authService, localStorageService } from "../../services";

const useLogin = () => {
  const [error, setError] = React.useState('');
  const [validUser, setValidUser] = React.useState(false);
  const [tryNumber, setTryNumber] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target.user.value;
    const password = e.target.password.value;
    const attempt = tryNumber + 1;
    setTryNumber(attempt);

    if (!user) {
      setError(LABELS.LOGIN.MESSAGES.ERROR.INVALID_USER);
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
      if (user === 'afatecha' && password === 'afatecha') {
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
          setError(`${user} ${LABELS.LOGIN.MESSAGES.ERROR.UNREGISTED_USER}`);
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
