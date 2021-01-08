import React, { useState } from "react";
import styled from "styled-components";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useHistory } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Typography } from "@material-ui/core";

const Menu = ({ allTasks, setAllTasks }) => {
  const history = useHistory();
  const [currentCategory, setCurrentCategory] = useState("Personal");
  const [currentPriority, setCurrentPriority] = useState("Low");
  const [dateValue, setDateValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errMsg, setErrMsg] = useState(null);

  // Post task fetch
  const handleSubmit = () => {
    fetch("/api/task", {
      method: "post",
      body: JSON.stringify({
        category: currentCategory,
        priority: currentPriority,
        date: dateValue,
        title: inputValue,
        completed: false,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAllTasks([data.data, ...allTasks]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  const goToHome = () => {
    history.push("/home");
  };

  let checkIfValid = (ev) => {
    ev.preventDefault();
    if (inputValue === "") {
      setErrMsg("input_err");
    }
    if (!currentCategory) {
      setErrMsg("category_err");
      return;
    }
    if (!currentPriority) {
      setErrMsg("priority_err");
      return;
    }
    if (!dateValue) {
      setErrMsg("date_err");
      return;
    }
    handleSubmit();
    console.log("Success");
    history.push("/home");
  };

  return (
    <>
      <BackIcon
        style={{
          fontSize: "2em",
        }}
        onClick={goToHome}
      />
      <Header>
        <Title>Task Details</Title>
      </Header>
      <Wrapper>
        <ListIcon style={{ fontSize: "3em" }} />
        <TextField
          label={
            <Typography style={{ fontFamily: "Montserrat" }}>
              Add Task
            </Typography>
          }
          onChange={onInputChange}
          style={{ margin: "10px", fontFamily: "Montserrat" }}
        />
        <FormControl>
          <SelectDropdown
            value={currentPriority}
            onChange={onPriorityChange}
            style={{ fontFamily: "Montserrat" }}>
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
          <SelectDropdown
            value={currentCategory}
            onChange={onCategoryChange}
            style={{ fontFamily: "Montserrat" }}>
            <MenuItem value='Personal'>Personal</MenuItem>
            <MenuItem value='Family'>Family</MenuItem>
            <MenuItem value='Work'>Work</MenuItem>
            <MenuItem value='Hobby'>Hobby</MenuItem>
          </SelectDropdown>
        </FormControl>
        <DateInput
          onChange={onDateChange}
          type='date'
          style={{ fontFamily: "Montserrat" }}
        />
        {errMsg === "input_err" && console.log("Add a title")}
        {errMsg === "date_err" && console.log("Add a date")}
        <ButtonWrap>
          <Button type='submit' onClick={checkIfValid}>
            <AddCircleIcon style={{ paddingRight: "5px", color: "white" }} />
            Create Task
          </Button>
        </ButtonWrap>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const BackIcon = styled(ArrowBackIcon)`
  position: absolute;
  top: 60px;
  color: #fba31f;
  padding: 3.5px;
  margin-left: 10px;
  background: #feeacc;
  border-radius: 50px;
`;

const ListIcon = styled(AssignmentIcon)`
  color: #1dd1a1;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  color: #2b2b2b;
  font-family: Montserrat;
`;

const DateInput = styled.input`
  border: none;
  padding: 10px 0 8px 0;
  margin: 10px 10px;
  border-bottom: 1.2px solid #949494;
`;

const SelectDropdown = styled(Select)`
  margin: 20px 10px;
  font-family: Montserrat;
`;

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

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  display: flex;
  max-width: 50%;
  align-items: center;
  margin: 0 auto;
  border-radius: 18px;
  padding: 20px;
  border: none;
  background: #ff6b6b;
  box-shadow: 0px 5px 20px 1px rgba(255, 107, 107, 0.4);
  font-family: Montserrat;
  font-size: 1.1em;
  font-weight: 500;
  color: white;
`;

export default Menu;
