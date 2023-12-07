import React from "react";
import { decode } from "html-entities";

function Question(props) {
  const { question, correctAnswer, incorrectAnswers } = props.question;
  const answersArray = [...incorrectAnswers, correctAnswer];
  const sortedArray = answersArray.sort(() => Math.random() - 0.5);

  const answerElements = sortedArray.map((answer, index) => {
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
