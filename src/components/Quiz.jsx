import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Question from "./Question";

function Quiz(props) {
  const [quiz, setQuiz] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=4&category=9")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        let quizArray = [];
        results.map((result) => {
          const { question, incorrect_answers, correct_answer } = result;
          quizArray.push({
            id: nanoid(),
            question: decode(question),
            incorrectAnswers: incorrect_answers,
            correctAnswer: correct_answer,
          });
        });
        setQuiz(quizArray);
      });
  }, []);

  const checkAnswers = () => {
    console.log("clicked");
  };

  const quizElements = quiz.map((question) => {
    return <Question question={question} key={question.id} />;
  });

  return (
    <div className="quiz-container">
      {quizElements}
      {quiz.length > 0 ? (
        <div className="align-center">
          <button className="check-answers-btn" onClick={checkAnswers}>
            Check answers
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Quiz;
