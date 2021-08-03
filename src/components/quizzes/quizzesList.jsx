import React from 'react';
import { Link } from 'react-router-dom';

import { QuizzesListItem } from './quizzesListItem';

const QuizzesList = ({ quizzes }) => {
  return (
    <>
      {quizzes.map((el, index) => (
        <Link key={index} to={`/quiz/${el.entity.publicId}`}>
          <QuizzesListItem key={index} quiz={el} />
        </Link>
      ))}
    </>
  );
};

export { QuizzesList };
