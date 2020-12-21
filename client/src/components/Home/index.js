import React from "react";
import styled from "styled-components";
import Header from "./Header";
import DateNav from "./DateNav";

const Home = () => {
  return (
    <Wrapper>
      <Header />
      <DateNav />
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

export default Home;
