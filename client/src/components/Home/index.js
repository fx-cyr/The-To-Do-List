import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import DateNav from "./DateNav";
import Todo from "./Todo";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [navDate, setNavDate] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Wrapper>
      <Header />
      <DateNav setNavDate={setNavDate} />
      <Todo setIsCompleted={setIsCompleted} isCompleted={isCompleted} />
      <Link to="/menu">Add a thing</Link>
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

const Button = styled.button``;

export default Home;
