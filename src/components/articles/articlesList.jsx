import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ArticlesListItem } from './articlesListItem';

const ArticlesList = ({ articles }) => {

  return (
    <>
      {articles.map((el) => (
        <Link to={`/article/${el.entity.publicId}`}>
          <ArticlesListItem article={el} />
        </Link>
      ))}
    </>
  );
};

export { ArticlesList };
