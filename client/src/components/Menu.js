import React, { useState } from 'react';
import styled from 'styled-components';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AssignmentIcon from '@material-ui/icons/Assignment';

const Menu = () => {
  const [currentCategory, setCurrentCategory] = useState('Personal');
  const [currentPriority, setCurrentPriority] = useState('Low');
  const [dateValue, setDateValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  //ev listener for user input
  const onInputChange = async (ev) => {
    const inputVal = ev.target.value;
    setInputValue(inputVal);
    // console.log(inputVal);
  };

  //ev listener for category
  const onCategoryChange = async (ev) => {
    const categoryVal = ev.target.value;
    setCurrentCategory(categoryVal);
    // console.log(categoryVal);
  };

  //ev listener for priority
  const onPriorityChange = async (ev) => {
    const priorityVal = ev.target.value;
    setCurrentPriority(priorityVal);
    // console.log(priorityVal);
  };

  //ev listener for selected date
  const onDateChange = async (ev) => {
    const dateVal = ev.target.value;
    setDateValue(dateVal);
    // console.log(dateVal);
  };

  return (
    <Wrapper>
      <Header>
        <ArrowBackIcon
          style={{ right: '100px', color: 'black', fontSize: '2em' }}
        />
        <Title>Add a To-Do</Title>
      </Header>
      <HeaderIcon style={{ fontSize: '3em' }} />
      <TextField
        label='Add To-Do List'
        onChange={onInputChange}
        style={{ margin: '10px' }}
      />
      <FormControl>
        <SelectDropdown value={currentPriority} onChange={onPriorityChange}>
          <MenuItem value='Low'>
            Low <LowDot />
          </MenuItem>
          <MenuItem value='Medium'>
            Medium
            <MediumDot />
          </MenuItem>
          <MenuItem value='High'>
            High
            <HighDot />
          </MenuItem>
        </SelectDropdown>
      </FormControl>
      <FormControl>
        <SelectDropdown value={currentCategory} onChange={onCategoryChange}>
          <MenuItem value='Personal'>Personal</MenuItem>
          <MenuItem value='Family'>Family</MenuItem>
          <MenuItem value='Work'>Work</MenuItem>
          <MenuItem value='Hobby'>Hobby</MenuItem>
        </SelectDropdown>
      </FormControl>
      <DateInput onChange={onDateChange} type='date' />
      <ButtonWrap>
        <Button>Add Task</Button>
      </ButtonWrap>
    </Wrapper>
  );
};

const LowDot = styled.span`
  height: 14px;
  width: 14px;
  margin-left: 5px;
  align-content: center;
  background-color: #ffea31;
  border-radius: 50%;
  display: inline-block;
`;
const MediumDot = styled.span`
  height: 14px;
  width: 14px;
  margin-left: 5px;
  align-content: center;
  background-color: #fba31f;
  border-radius: 50%;
  display: inline-block;
`;
const HighDot = styled.span`
  height: 14px;
  width: 14px;
  margin-left: 5px;
  align-content: center;
  background-color: #ff2e00;
  border-radius: 50%;
  display: inline-block;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderIcon = styled(AssignmentIcon)`
  color: #30c223;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-right: 110px;
  font-size: 1.5rem;
`;

const DateInput = styled.input`
  border: none;
  padding: 16px;
  margin: 10px 10px;
  border-bottom: 1.2px solid #949494;
`;

const SelectDropdown = styled(Select)`
  margin: 20px 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
`;

const Button = styled.button`
  justify-content: center;
  display: flex;
  margin-top: 20px;
  background: #06bbf4;
  color: white;
  border-radius: 50px;
  padding: 15px;
  margin: 30px 50px;
  border: 0px;
  outline: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

export default Menu;
