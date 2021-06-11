import React, { useState, useEffect } from 'react';

const useCreateAreaBadge = (area) => {
  const [badge, setBadge] = useState({});
  useEffect(() => {
    if (area === 'matematicas')
      setBadge({ color: 'blue', content: 'MATEMÁTICAS' });
    if (area === 'comunicacion')
      setBadge({ color: 'red', content: 'COMUNICACIÓN' });
    if (area === 'ciencias_naturales')
      setBadge({ color: 'green', content: 'CIENCIAS NATURALES' });
    if (area === 'estudios_sociales')
      setBadge({ color: 'orange', content: 'ESTUDIOS SOCIALES' });
  }, [area]);
  return badge;
};

export { useCreateAreaBadge };
