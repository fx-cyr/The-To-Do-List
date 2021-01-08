import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Todo from "./Todo";
import { useHistory } from "react-router-dom";
import moment from "moment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";

const Home = () => {
  const todayRaw = new Date();
  const today = moment(todayRaw).format("YYYY-MM-DD");
  console.log(today);
  const [allTasks, setAllTasks] = useState([]);
  const history = useHistory();
  const [navDate, setNavDate] = useState();
  const [isCompleted, setIsCompleted] = useState(false);
  console.log(navDate);

  const handleChange = (state, ev) => {
    state(ev.target.value);
    fetch(`/api/task/${ev.target.value}`, {
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
  };

  const addTodo = () => {
    history.push("/menu");
  };

  return (
    <Wrapper>
      <Header />
      <FormContainer>
        <Form>
          <Input
            type='date'
            value={navDate}
            placeholder='Select a date'
            onChange={(ev) => {
              handleChange(setNavDate, ev);
            }}></Input>
        </Form>
      </FormContainer>
      {/* <DateNav setNavDate={setNavDate} navDate={navDate} /> */}
      {allTasks != null ? (
        allTasks.map((task) => {
          return (
            <Todo
              task={task}
              isCompleted={isCompleted}
              setIsCompleted={setIsCompleted}
              allTasks={allTasks}
              setAllTasks={setAllTasks}
            />
          );
        })
      ) : (
        <NoTasks>
          No tasks for today
          <HourglassEmptyIcon style={{ paddingLeft: "5px" }} />
        </NoTasks>
      )}
      <Button onClick={addTodo}>
        <AddCircleIcon style={{ paddingRight: "5px", color: "white" }} />
        Create Task
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Montserrat;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 20px 0;
  border-radius: 18px;
  padding: 20px;
  border: none;
  background: #ff5959;
  box-shadow: 0px 5px 20px 1px rgba(255, 107, 107, 0.4);
  font-family: Montserrat;
  font-size: 1.1em;
  font-weight: 500;
  color: white;
`;

const Input = styled.input`
  border: none;
  padding: 20px;
  margin: 5px 5px;
  border-radius: 15px;
  border: 1px solid #e1e1e1;
  font-family: Montserrat;
  -webkit-box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form``;

const FormContainer = styled.div`
  padding: 20px 0;
`;

const NoTasks = styled.span`
  color: #2e86de;
  background: rgba(46, 134, 222, 0.25);
  display: flex;
  justify-content: center;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
`;

export default Home;
