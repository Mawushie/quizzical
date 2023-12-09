import React from "react";
import { decode } from "html-entities";
import { useState } from "react";

function Question(props) {
  // const [fini]
  const { id, question, correctAnswer, allAnswers, selected } = props.question;
  //   console.log(props.displayResults);

  const answerElements = allAnswers.map((answer, index) => {
    let styles;
    //answer === selected && answer === correctAnswer
    //then background is green
    //if answer === selected and answer !==correctAnswer
    //then background is pink
    //if answer === correctAnswer
    //then background is green
    if (props.displayResults === true) {
      answer === correctAnswer
        ? (styles = {
            backgroundColor: "#94D7A2",
          })
        : answer === selected
        ? (styles = {
            backgroundColor: "#F8BCBC",
          })
        : "";
    } else {
      styles = {
        backgroundColor: answer === selected ? "#D6DBF5" : "transparent",
      };
    }

    return (
      <div className="answer" key={index} style={styles}>
        <p onClick={() => props.handleSelected(id, answer)}>{decode(answer)}</p>
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
