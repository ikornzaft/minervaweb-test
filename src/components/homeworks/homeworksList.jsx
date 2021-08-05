import React from 'react';
import { Link } from 'react-router-dom';

import { HomeworksListItem } from './homeworksListItem';

const HomeworksList = ({ homeworks }) => {
  return (
    <>
      {homeworks.map((el, index) => (
        <Link key={index} to={`/homework/${el.entity.publicId}`}>
          <HomeworksListItem key={index} homework={el} />
        </Link>
      ))}
    </>
  );
};

export { HomeworksList };
