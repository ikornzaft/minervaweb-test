const FetchComponent = (method, message, setIsLoading, setError, setContent) => {
  const url = 'http://afatecha.com:8080/minerva-server-web/minerva/perform';
  const credentials = localStorage.getItem('credentials');
  const jsonMessage = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      id: 'msgid-1',
      target: 'soa@service/minerva',
      method: method,
      requester: 'root:YWNhY2lhITIwMTc=',
      principal: credentials,
      message: message,
    }),
  };

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(url, jsonMessage);

      if (res.status >= 400 && res.status < 600) setError('Bad response from server');
      const resJson = await res.json();

      console.log(resJson);
      setContent(resJson);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  fetchData();
};

export { FetchComponent };
