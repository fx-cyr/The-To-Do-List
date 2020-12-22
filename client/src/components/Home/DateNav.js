import React from "react";
import styled from "styled-components";

const DateNav = ({ setNavDate }) => {
  const handleChange = (state, ev) => {
    state(ev.target.value);
  };

  return (
    <Wrapper>
      <Form>
        <Input
          type="date"
          placeholder="Select a date"
          onChange={(ev) => {
            handleChange(setNavDate, ev);
          }}
        ></Input>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  margin: 20px 0;
`;

const Input = styled.input`
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default DateNav;
