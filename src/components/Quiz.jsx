import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

function Quiz(props) {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    console.log("quesitons loaded");
    fetch("https://opentdb.com/api.php?amount=3&category=12")
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
        console.log(quiz);
      });
  }, []);

  const quizElements = quiz.map((question) => {
    return (
      <div key={question.id}>
        <h2>{question.question}</h2>
        <p>{question.correctAnswer}</p>
        <hr />
      </div>
    );
  });
  return <div>{quizElements}</div>;
}

export default Quiz;
