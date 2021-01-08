import React from "react";
import styled from "styled-components";
import CheckIcon from "@material-ui/icons/Check";

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
      })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          fetch(`/api/task/${task.date}`, {
            method: "get",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.data) {
                setAllTasks(json.data);
              } else {
                setAllTasks(null);
              }
            })
            .catch((err) => {
              console.log(err);
            });
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
      })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {
          fetch(`/api/task/${task.date}`, {
            method: "get",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => {
              return res.json();
            })
            .then((json) => {
              if (json.data) {
                setAllTasks(json.data);
              } else {
                setAllTasks(null);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
    }
  };

  return (
    <>
      {task && (
        <>
          {task.completed === false ? (
            <Wrapper>
              <Checker
                onClick={() => {
                  handleCompletion();
                }}></Checker>
              <Description>
                <Title>{task.title}</Title>
                <Category>{task.category}</Category>
              </Description>
              <Priority>{task.priority}</Priority>
            </Wrapper>
          ) : (
            <DoneWrapper>
              <DoneChecker
                onClick={() => {
                  handleCompletion();
                }}>
                <CheckIcon style={{ color: "#1DD1A1" }} />
              </DoneChecker>
              <Description>
                <DoneTitle>{task.title}</DoneTitle>
                <DoneCategory>{task.category}</DoneCategory>
              </Description>
              <DonePriority>Complete</DonePriority>
            </DoneWrapper>
          )}
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  font-family: Montserrat;
  font-weight: 500;
  margin: 10px;
  padding: 20px;
  display: flex;
  width: 85%;
  justify-content: space-around;
  align-items: center;
  border: none;
  border-radius: 18px;
  -webkit-box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.2);
`;

const DoneWrapper = styled.div`
  font-family: Montserrat;
  font-weight: 500;
  margin: 10px;
  padding: 20px;
  display: flex;
  width: 85%;
  justify-content: space-around;
  align-items: center;
  border: none;
  border-radius: 18px;
  -webkit-box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 5px 15px 2px rgba(0, 0, 0, 0.2);
`;

const Checker = styled.button`
  width: 38px;
  height: 38px;
  margin-right: 5px;
  border-radius: 50%;
  border: 2px solid #1dd1a1;
  background-color: white;
`;

const DoneChecker = styled.button`
  width: 38px;
  height: 38px;
  margin-right: 5px;
  border-radius: 50%;
  border: none;
  background: rgba(29, 209, 161, 0.25);
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Description = styled.div`
  width: 60%;
`;

const Title = styled.p`
  font-size: 1em;
  color: #2b2b2b;
  margin: 0 auto;
`;

const DoneTitle = styled.p`
  font-size: 1em;
  margin: 0 auto;
  color: #cccccc;
`;

const Category = styled.span`
  color: #a3a3a3;
  font-size: 0.8em;
  margin: 0 auto;
`;

const DoneCategory = styled.span`
  color: #cccccc;
  font-size: 0.8em;
  margin: 0 auto;
`;

const Priority = styled.p`
  width: 20%;
  font-size: 0.8em;
  color: #fba31f;
  background: #feeacc;
  display: flex;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
`;

const DonePriority = styled.p`
  width: 20%;
  color: #1dd1a1;
  font-size: 0.8em;
  background: rgba(29, 209, 161, 0.25);
  display: flex;
  justify-content: center;
  padding: 5px;
  border-radius: 6px;
`;

export default Todo;
