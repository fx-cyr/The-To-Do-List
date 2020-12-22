import React from "react";
import styled from "styled-components";

const Todo = ({ setIsCompleted, isCompleted }) => {
  const handleCompletion = () => {
    setIsCompleted(!isCompleted);
  };
  return (
    <Wrapper>
      <Checker
        type="checkbox"
        onChange={() => {
          handleCompletion();
        }}
      />
      <Description>
        <Title>Code a to do list</Title>
        <Category>Personal</Category>
      </Description>
      <Priority>High</Priority>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border: 2px solid grey;
  border-radius: 18px;
`;

const Checker = styled.input`
  width: 20%;
`;

const Description = styled.div`
  width: 60%;
`;

const Title = styled.p`
  font-size: 18px;
  margin: 0 auto;
`;

const Category = styled.span`
  font-size: 12px;
  margin: 0 auto;
`;

const Priority = styled.p`
  width: 20%;
  color: tomato;
`;

export default Todo;
