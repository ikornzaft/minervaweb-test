import React from 'react';

const FilteredContentsList = ({ contents }) => {
  return (
    <>
      {contents.map((el, index) => (
        <div key={index}>
          <p>Título: {el.contentHeader.descriptor.title}</p>
          <p>Subtítulo: {el.contentHeader.descriptor.subtitle}</p>
        </div>
      ))}
    </>
  );
};

export { FilteredContentsList };
