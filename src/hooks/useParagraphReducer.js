import React, { useState } from 'react';

const useParagraphReducer = (p) => {
  if (p.length > 220) {
    const parag = p.split("").splice(0,220).join('').split(' ');
    parag.pop();
    return parag.join(' ') + ' (...)';
  }
  return p;
};

export { useParagraphReducer };
