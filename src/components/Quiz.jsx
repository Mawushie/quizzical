import React from "react";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Question from "./Question";

function Quiz(props) {
  const [quiz, setQuiz] = useState([]);
  const [checkAnswer, setCheckAnswer] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=16")
      .then((res) => res.json())
      .then((data) => {
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
        console.log(quizArray);
        setQuiz(quizArray);
      });
  }, []);

  const handleSelected = (id, selectedAnswer) => {
    // console.log(id, selectedAnswer);
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

  const quizElements = quiz.map((question) => {
    return (
      <Question
        question={question}
        key={question.id}
        handleSelected={handleSelected}
      />
    );
  });

  return (
    <div className="quiz-container">
      {quizElements}
      {quiz.length > 0 ? (
        <div className="align-center">
          <button className="check-answers-btn">Check answers</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Quiz;
