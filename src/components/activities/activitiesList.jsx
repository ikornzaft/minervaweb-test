import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ActivitiesListItem } from './activitiesListItem';

const ActivitiesList = ({ contents }) => {

  const [numberOfActivities, setNumberOfActivities] = useState(null)

  useEffect(() => {
    console.log("useeffect")
    setNumberOfActivities(contents.length);
  }, [contents])

  return (
    <>
      {contents.map((el) => (
        <Link to={`/article/${el.header.publicId}`}>
          <ActivitiesListItem article={el} />
        </Link>
      ))}
    </>
  );
};

export { ActivitiesList };
