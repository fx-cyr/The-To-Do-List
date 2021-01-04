import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Todo from "./Todo";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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
      {allTasks != null
        ? allTasks.map((task) => {
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
        : "Nothing to see here 😎..."}
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
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  margin: 20px 0;
  border-radius: 18px;
  padding: 16px 20px;
  border: none;
  background: #ff6b6b;
  box-shadow: 0px 5px 20px 1px rgba(255, 107, 107, 0.4);
  font-family: Montserrat;
  font-size: 1.1em;
  font-weight: 500;
  color: white;
`;

const Input = styled.input`
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Form = styled.form``;

const FormContainer = styled.div`
  padding: 20px 0;
`;

export default Home;
