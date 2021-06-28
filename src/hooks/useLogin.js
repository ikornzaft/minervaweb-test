import React, {useState, useEffect} from 'react';
import { LABELS } from '../locals/sp/labels';

// import { authService, localStorageService } from "../../services";

const useLogin = () => {
  const [error, setError] = useState('');
  const [validUser, setValidUser] = useState(false);
  const [tryNumber, setTryNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
  const Message = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/articles/handlers/FindArticles',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: 'afatecha:YWZhdGVjaGExMjM=',
      message: {
        workarea: {publicId: 'sociales'},
        workgroups: [{publicId: ''}]
      },
    }),
  };

  const jsonMessage = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: 'mods/quizzes/handlers/GetQuiz',
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: 'afatecha:YWZhdGVjaGExMjM=',
      message: {
        entityRef: { "publicId": "10eee37e-e3f1-48d2-9cc7-d89c507adc33" }
      },
    }),
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, jsonMessage);
        if (res.status >= 400 && res.status < 600)
          setError('Bad response from server');
        const resJson = await res.json();
        console.log(resJson);
        // save user data to localstorage
        localStorage.setItem('userWorkgroups', 'test');
        localStorage.setItem('userName', 'afatecha');
        localStorage.setItem('isStudent', 'false');
        localStorage.setItem('isEditor', 'true');
        localStorage.setItem('isResearcher', 'false');

      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);  

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
