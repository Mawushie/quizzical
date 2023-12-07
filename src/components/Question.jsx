import React from "react";
import { decode } from "html-entities";

function Question(props) {
  const { question, correctAnswer, incorrectAnswers } = props.question;
  const answersArray = [...incorrectAnswers, correctAnswer];

  const shuffleAnswers = (answersArray) => {
    return answersArray.sort(() => Math.random() - 0.5);
  };
  shuffleAnswers(answersArray);

  const answerElements = answersArray.map((answer, index) => {
    shuffleAnswers(answersArray);
    return (
      <div className="answer" key={index}>
        <p>{decode(answer)}</p>
      </div>
    );
  });

  return (
    <div>
      <h4 className="f-karla">{question}</h4>
      <div className="answers">{answerElements}</div>
      <hr />
    </div>
  );
}

export default Question;
