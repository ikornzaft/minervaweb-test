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
        
             'entityRef': { "publicId": "4e306d31-bdc7-47fe-8c80-ea2c41ca05e7" }
        
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
                console.log(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { articleContent, error, loading };
};

export { useFetchArticle };