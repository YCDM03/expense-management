import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const ExForm = styled.form`
  max-width: 1200px;
  min-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  display: flex;
  gap: 20px;
  border: 1px solid #5b5bf5;
  border-radius: 10px;
`;
const ExDiv = styled.div`
  width: 23%;
`;
const ExInput = styled.input`
  width: 100%;
  height: 20px;
  margin-right: 20px;
  border: 1px solid ${(props) => (props.$valid ? "gray" : "red")};
  border-radius: 3px;
`;

const ExButton = styled.button`
  width: 8%;
  align-self: end;
  margin-left: auto;
  color: white;
  background-color: #5b5bf5;
  border: 1px solid white;
  border-radius: 5px;
  &:hover {
    background-color: #373797;
  }
  &:active {
    background-color: #5b5bf5;
  }
`;
const expenseArr = ["날짜", "지출 항목", "지출 금액", "지출 내용"];
const expenseNameArr = ["date", "type", "price", "detail"];

export default function ExpenseForm({ setList }) {
  const [valid, setValid] = useState([
    { date: true },
    { type: true },
    { price: true },
    { detail: true },
  ]);

  const addExpenseItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (isNaN(+formData.get("price"))) {
      setValid((prev) => ([...prev][2][`${expenseNameArr[2]}`] = false));
      return alert("올바른 금액을 입력하세요");
    } else {
      setValid((prev) => ([...prev][2][`${expenseNameArr[2]}`] = true));
    }

    const inputArr = expenseNameArr.map((el) => {
      return formData.get(el);
    });

    for (let i = 0; i < inputArr.length; i++) {
      if (!inputArr[i]) {
        setValid(() => {
          const arr = [...valid];
          arr[i][`${expenseNameArr[i]}`] = false;
          return arr;
        });
      } else {
        setValid(() => {
          const arr = [...valid];
          arr[i][`${expenseNameArr[i]}`] = true;
          return arr;
        });
      }
    }

    const [date, type, price, detail] = inputArr;
    setList((prev) => [...prev, { id: uuidv4(), date, type, price, detail }]);
  };

  return (
    <ExForm onSubmit={addExpenseItem}>
      {expenseArr.map((item, i) => {
        if (item === "날짜") {
          return (
            <ExDiv key={"div" + item}>
              <h4>{item.slice(-2)}</h4>
              <ExInput
                key={item}
                type="date"
                name={expenseNameArr[i]}
                placeholder={item}
                min="2024-01-01"
                max="2024-12-31"
                $valid={valid[i][`${expenseNameArr[i]}`]}
              />
            </ExDiv>
          );
        }

        return (
          <ExDiv key={"div" + item}>
            <h4>{item.slice(-2)}</h4>
            <ExInput
              key={item}
              type="text"
              name={expenseNameArr[i]}
              placeholder={item}
              $valid={valid[i][`${expenseNameArr[i]}`]}
            />
          </ExDiv>
        );
      })}
      <ExButton>저장</ExButton>
    </ExForm>
  );
}
