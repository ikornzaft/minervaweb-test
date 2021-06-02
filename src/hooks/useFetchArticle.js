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
        
             'entityRef': { "publicId": "4e152299-ff58-4587-9f32-3cad524e378a" }
        
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