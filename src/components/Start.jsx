import React from "react";
import styled from "styled-components";

function Start(props) {
  return (
    <Container>
      <h1 className="f-karla">Quizzical</h1>
      <p className="f-inter">Let's Test your Knowledge!</p>
      <button className="start-btn" onClick={props.toggleStart}>
        Start quiz
      </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  h1 {
    font-weight: 700;
  }
`;

export default Start;
