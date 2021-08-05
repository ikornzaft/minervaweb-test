const ParagraphReducer = (p) => {
  if (p.length > 180) {
    const parag = p.split('').splice(0, 180).join('').split(' ');

    parag.pop();

    return parag.join(' ') + ' (...)';
  }

  return p;
};

export { ParagraphReducer };
