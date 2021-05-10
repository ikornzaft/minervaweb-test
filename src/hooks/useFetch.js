import { useState, useEffect } from 'react';

const useFetch = () => { 

    const url='https://dog.ceo/api/breeds/image/random';
    const [dogImage, setDogImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.status >= 400 && response.status < 600) setError('Bad response from server');
                const resJson = await response.json();
                setDogImage(resJson.message);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { dogImage, error, loading };
};

export { useFetch };