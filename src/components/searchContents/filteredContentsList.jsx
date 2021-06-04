import React from 'react';

const FilteredContentsList = ({ contents }) => {
  return (
    <>
      {contents.map((el) => (
        <div>
          <p>Título: {el.contentHeader.descriptor.title}</p>
          <p>Subtítulo: {el.contentHeader.descriptor.subtitle}</p>
        </div>
      ))}
    </>
  );
};

export { FilteredContentsList };
