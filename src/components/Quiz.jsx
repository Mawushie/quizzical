import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Question from "./Question";
import styled from "styled-components";
import { BounceLoader } from "react-spinners";

function Quiz(props) {
  const [quiz, setQuiz] = useState([]);
  const [warning, setWarning] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [displayResults, setDisplayResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setLoading((prev) => !prev);
        let results = data.results;
        let quizArray = [];
        results.map((result) => {
          const { question, incorrect_answers, correct_answer } = result;
          let allAnswersTemp = [...incorrect_answers, correct_answer];
          let sortedAnswers = allAnswersTemp.sort(() => Math.random() - 0.5);
          quizArray.push({
            id: nanoid(),
            question: decode(question),
            incorrectAnswers: incorrect_answers,
            correctAnswer: correct_answer,
            allAnswers: sortedAnswers,
            selected: "",
          });
        });
        // console.log(quizArray);
        setQuiz(quizArray);
      });
  }, []);

  const handleSelected = (id, selectedAnswer) => {
    //go through each of them and update the selected for that particular id
    setQuiz((prevQuiz) => {
      const updatedQuiz = prevQuiz.map((quiz) => {
        return quiz.id === id
          ? {
              ...quiz,
              selected: selectedAnswer,
            }
          : quiz;
      });
      // console.log(updatedQuiz);
      return updatedQuiz;
    });
  };

  const calculateScore = () => {
    quiz.forEach((quiz) => {
      if (quiz.selected === quiz.correctAnswer) {
        // console.log("you were right");
        setCorrectAnswerCount((prevCount) => prevCount + 1);
      } else {
        ("");
      }
    });
  };
  const checkAnswers = () => {
    const allSelected = quiz.every((q) => q.selected !== "");
    if (allSelected) {
      setWarning(false);
      setDisplayResults(true);
      calculateScore();
      // setQuiz((prevQuiz) => {
      //   const updatedQuiz = prevQuiz.map((quiz) => {
      //     return {
      //       ...quiz,
      //       // finalAnswer: quiz.selected,
      //     };
      //   });
      //   // console.log(updatedQuiz);
      //   return updatedQuiz;
      // });
    } else {
      setWarning(true);
      setDisplayResults(false);
    }
  };

  const quizElements = quiz.map((question) => {
    return (
      <Question
        question={question}
        key={question.id}
        handleSelected={handleSelected}
        displayResults={displayResults}
      />
    );
  });

  return (
    <div className="quiz-container">
      {loading && (
        <Div>
          <BounceLoader color="#293264" />
        </Div>
      )}
      {quizElements}
      {quiz.length > 0 && !displayResults ? (
        <div className="align-center">
          <button className="check-answers-btn btns" onClick={checkAnswers}>
            Check answers
          </button>
        </div>
      ) : (
        ""
      )}
      {warning && (
        <H3 className="warning">Please select an answer for each question</H3>
      )}

      {displayResults && (
        <Div>
          <h5>You scored {correctAnswerCount}/5 correct answers</h5>
          <button onClick={props.playAgain} className="play-again-btn btns">
            {" "}
            Play again
          </button>
        </Div>
      )}
    </div>
  );
}

const H3 = styled.h3`
  color: red;
  font-family: "Karla", sans-serif;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export default Quiz;
