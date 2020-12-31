import React from "react";
import styled from "styled-components";

const Todo = ({ setIsCompleted, isCompleted, setAllTasks, allTasks, task }) => {
  const handleCompletion = () => {
    if (task.completed === false) {
      fetch(`/api/task/${task._id}`, {
        method: "put",
        body: JSON.stringify({
          completed: true,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        console.log(err);
      });
    } else {
      fetch(`/api/task/${task._id}`, {
        method: "put",
        body: JSON.stringify({
          completed: false,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      {task && (
        <Wrapper>
          <Checker
            onClick={() => {
              handleCompletion();
            }}
          >
            🔧
          </Checker>

          <Description>
            {task.completed === false ? (
              <Title>{task.title}</Title>
            ) : (
              <CrossedTitle>{task.title}</CrossedTitle>
            )}

            <Category>{task.category}</Category>
          </Description>
          <Priority>{task.priority}</Priority>
        </Wrapper>
      )}
    </>
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

const Checker = styled.button`
  width: 20%;
  width: 40px;
  height: 20px;
`;

const Description = styled.div`
  width: 60%;
`;

const Title = styled.p`
  font-size: 18px;
  margin: 0 auto;
`;

const CrossedTitle = styled.p`
  font-size: 18px;
  margin: 0 auto;
  text-decoration: line-through;
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
