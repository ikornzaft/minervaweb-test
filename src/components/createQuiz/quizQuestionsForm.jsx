import React, { useState, useEffect } from 'react';
import { QuizQuestionCreator } from './quizQuestionCreator';

const QuizQuestionsForm = ({
  newQuizQuestionsArray,
  setNewQuizQuestionsArray,
}) => {
  const [question, setQuestion] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const createQuestion = (e) => {
    setQuestion(e);
  };

  const createRightAnswer = (e) => {
    setRightAnswer(e);
  };

  const createWrongAnswers = (e) => {
    setWrongAnswers(e);
  };

  const addNewQuestionToArray = () => {
    const newEntry = {
      question: question,
      rightAnswer: rightAnswer,
      wrongAnswers: wrongAnswers,
    };
    setNewQuizQuestionsArray(newEntry);
  }

  useEffect(() => {
    console.log(wrongAnswers);
  }, [wrongAnswers]);

  return (
    <div>
      <QuizQuestionCreator
        question={question}
        createQuestion={createQuestion}
        rightAnswer={rightAnswer}
        createRightAnswer={createRightAnswer}
        wrongAnswers={wrongAnswers}
        createWrongAnswers={createWrongAnswers}
        addNewQuestionToArray={addNewQuestionToArray}
      />
    </div>
  );
};

export { QuizQuestionsForm };
