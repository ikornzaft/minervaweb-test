import React from 'react';
import { Link } from 'react-router-dom';

import { ArticlesListItem } from './articlesListItem';

const ArticlesList = ({ articles }) => {

  return (
    <>
      {articles.map((el, index) => (
        <Link to={`/article/${el.entity.publicId}`}>
          <ArticlesListItem key={index} article={el} />
        </Link>
      ))}
    </>
  );
};

export { ArticlesList };
