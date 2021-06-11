import { Link } from 'react-router-dom';

import { ActivitiesListItem } from './activitiesListItem';

const ActivitiesList = ({ contents }) => {


  return (
    <>
      {contents.map((el) => (
        <Link to={`/articulo/${el.header.publicId}`}>
          <ActivitiesListItem article={el} />
        </Link>
      ))}
    </>
  );
};

export { ActivitiesList };
