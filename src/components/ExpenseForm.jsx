import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import {
  StForm,
  StDiv,
  StInput,
  StValidDiv,
  StBtnDiv,
} from "../shared/FormComponent";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ListContext } from "../context/ListContext";

const expenseArr = ["날짜", "지출 항목", "지출 금액", "지출 내용"];
const expenseNameArr = ["date", "type", "price", "detail"];

export default function ExpenseForm({
  restList,
  editState,
  targetItem,
  id,
  children,
  selectedMonth,
}) {
  const navigate = useNavigate();
  const [valid, setValid] = useState([
    { date: true },
    { type: true },
    { price: true },
    { detail: true },
  ]);
  const { setList } = useContext(ListContext);

  const addExpenseItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    //form vaildation
    if (isNaN(formData.get("price"))) {
      setValid(() => {
        const arr = [...valid];
        arr[2][`price`] = false;
        return arr;
      });
      return alert("금액은 숫자로 입력해주세요");
    } else {
      setValid(() => {
        const arr = [...valid];
        arr[2][`price`] = true;
        return arr;
      });
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
    if (!date || !type || !price || !detail) {
      return;
    }
    //

    editState
      ? setList(() => [...restList, { id, date, type, price: +price, detail }])
      : setList((prev) => [
          ...prev,
          { id: uuidv4(), date, type, price, detail },
        ]);

    editState ? navigate("/") : e.target.reset();
  };

  return (
    <StForm onSubmit={addExpenseItem} $targetItem={targetItem ? true : false}>
      {expenseArr.map((item, i) => {
        if (item === "날짜") {
          return (
            <StDiv key={"div" + item} $targetItem={targetItem ? true : false}>
              <h4>{item.slice(-2)}</h4>
              <StInput
                key={item + selectedMonth}
                type="date"
                name={expenseNameArr[i]}
                placeholder={item}
                min="2024-01-01"
                max="2024-12-31"
                $valid={valid[i][`${expenseNameArr[i]}`]}
                defaultValue={
                  editState
                    ? targetItem[expenseNameArr[i]]
                    : "2024-" + selectedMonth + "-01"
                }
              />
              <StValidDiv $valid={valid[i][`${expenseNameArr[i]}`]}>
                올바른 날짜를 입력해주세요
              </StValidDiv>
            </StDiv>
          );
        }

        return (
          <StDiv key={"div" + item} $targetItem={targetItem ? true : false}>
            <h4>{item.slice(-2)}</h4>
            <StInput
              key={item}
              type="text"
              name={expenseNameArr[i]}
              placeholder={item}
              $valid={valid[i][`${expenseNameArr[i]}`]}
              defaultValue={targetItem ? targetItem[expenseNameArr[i]] : null}
            />
            <StValidDiv $valid={valid[i][`${expenseNameArr[i]}`]}>
              올바른 {item.slice(-2)}을 입력해주세요
            </StValidDiv>
          </StDiv>
        );
      })}
      <StBtnDiv $targetItem={targetItem ? true : false}>
        {children ? children : null}
      </StBtnDiv>
    </StForm>
  );
}
