import React from 'react';
import { Link } from 'react-router-dom';

import { ActivitiesListItem } from './activitiesListItem';

const ActivitiesList = ({ activities }) => {
  return (
    <>
      {activities.map((el, index) => (
        <Link
          key={index}
          to={{
            pathname: `/article/${el.entity.publicId}`,
            state: { activity: true },
          }}
        >
          <ActivitiesListItem article={el} />
        </Link>
      ))}
    </>
  );
};

export { ActivitiesList };
