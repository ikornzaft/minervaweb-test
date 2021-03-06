const ParagraphReducer = (p) => {
  if (p.length > 160) {
    const parag = p.split('').splice(0, 160).join('').split(' ');

    parag.pop();

    return parag.join(' ') + ' (...)';
  }

  return p;
};

export { ParagraphReducer };
