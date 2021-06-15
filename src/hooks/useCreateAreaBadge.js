import { useState, useEffect } from 'react';
import { LABELS } from '../locals/sp/labels';

const useCreateAreaBadge = (area) => {
  const [badge, setBadge] = useState({});
  useEffect(() => {
    if (area === 'matematicas')
      setBadge({
        color: 'blue',
        content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_1,
      });
    if (area === 'comunicacion')
      setBadge({
        color: 'red',
        content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_2,
      });
    if (area === 'ciencias_naturales')
      setBadge({
        color: 'green',
        content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_3,
      });
    if (area === 'estudios_sociales')
      setBadge({
        color: 'purple',
        content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_4,
      });
  }, [area]);
  return badge;
};

export { useCreateAreaBadge };
