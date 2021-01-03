import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Todo from "./Todo";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";

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
            type="date"
            value={navDate}
            placeholder="Select a date"
            onChange={(ev) => {
              handleChange(setNavDate, ev);
            }}
          ></Input>
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
        : "Seems like you're 😎"}

      <Button onClick={addTodo}>Add a thing</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button`
  margin: 20px 0;
  border-radius: 20px;
  padding: 10px 20px;
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
