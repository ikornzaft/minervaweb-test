import { Link } from 'react-router-dom';

import { ActivitiesListItem } from './activitiesListItem';

const ActivitiesList = ({ contents }) => {

  console.log(contents);
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
