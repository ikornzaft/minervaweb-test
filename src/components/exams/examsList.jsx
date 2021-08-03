import React from 'react';
import { Link } from 'react-router-dom';

import { ExamsListItem } from './examsListItem';

const ExamsList = ({ exams }) => {
  return (
    <>
      {exams.map((el, index) => (
        <Link key={index} to={`/exam/${el.entity.publicId}`}>
          <ExamsListItem key={index} exam={el} />
        </Link>
      ))}
    </>
  );
};

export { ExamsList };
