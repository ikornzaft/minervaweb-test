import React from 'react';
import { Link } from 'react-router-dom';

import { ArticlesListItem } from './articlesListItem';

const ArticlesList = ({ articles }) => {
  return (
    <>
      {articles.map((el, index) => (
        <Link key={index} to={`/article/${el.entity.publicId}`}>
          <ArticlesListItem article={el} />
        </Link>
      ))}
    </>
  );
};

export { ArticlesList };
