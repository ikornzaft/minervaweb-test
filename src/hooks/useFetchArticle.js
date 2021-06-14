import { useState, useEffect } from 'react';

const useFetchArticle = (id) => { 

    const url='http://afatecha.com:8080/minerva-server-web/minerva/perform';
    const jsonMessage = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
          'id': "msgid-1",
          'target': "soa@service/minerva",
          'method': "mods/articles/handlers/GetArticle",
          'requester': "root:YWNhY2lhITIwMTc=",
          'principal': "root:cm9vdA==",
          'message': {
        
             'entityRef': { "publicId": "f0795703-431d-4642-8764-229c1fa54b4f" }
        
          }
        }),
      };
    const [articleContent, setArticleContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, jsonMessage);
                if (response.status >= 400 && response.status < 600) setError('Bad response from server');
                const resJson = await response.json();
                setArticleContent(resJson.message.entity.resource);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(loading);
    return { articleContent, error, loading };
};

export { useFetchArticle };