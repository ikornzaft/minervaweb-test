import { LABELS } from '../../locals/sp/labels';

const CreateAreaBadge = (area) => {
  let badge = {};

  if (area === 'mate')
    badge = {
      color: 'blue',
      content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_1,
    };
  if (area === 'comunicacion')
    badge = {
      color: 'red',
      content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_2,
    };
  if (area === 'naturales')
    badge = {
      color: 'green',
      content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_3,
    };
  if (area === 'sociales')
    badge = {
      color: 'purple',
      content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_4,
    };
  if (area === 'research')
    badge = {
      color: 'yellow',
      content: LABELS.ACTIVITIES.ACTIVITY.BADGES.AREA_5,
    };

  return badge;
};

export { CreateAreaBadge };
