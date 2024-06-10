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
import { useDispatch } from "react-redux";
import { addList, editList } from "../redux/slices/listSlice";

const expenseKoNameArr = ["날짜", "지출 항목", "지출 금액", "지출 내용"];
const expenseEnNameArr = ["date", "type", "price", "detail"];

export default function ExpenseForm({
  forEdit,
  targetItem = null,
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

  const dispatch = useDispatch();

  const addExpenseItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    //form vaildation
    if (isNaN(formData.get("price"))) {
      setValid(() => {
        const validArr = [...valid];
        validArr[2][`price`] = false;
        return validArr;
      });
      return alert("금액은 숫자로 입력해주세요");
    } else {
      setValid(() => {
        const validArr = [...valid];
        validArr[2][`price`] = true;
        return validArr;
      });
    }

    const inputArr = expenseEnNameArr.map((el) => {
      return formData.get(el);
    });

    for (let i = 0; i < inputArr.length; i++) {
      if (!inputArr[i]) {
        setValid(() => {
          const validArr = [...valid];
          validArr[i][`${expenseEnNameArr[i]}`] = false;
          return validArr;
        });
      } else {
        setValid(() => {
          const validArr = [...valid];
          validArr[i][`${expenseEnNameArr[i]}`] = true;
          return validArr;
        });
      }
    }

    const [date, type, price, detail] = inputArr;
    if (!date || !type || !price || !detail) {
      return;
    }
    //

    forEdit
      ? dispatch(editList({ id, date, type, price: +price, detail }))
      : dispatch(addList({ id: uuidv4(), date, type, price, detail }));

    forEdit ? navigate("/") : e.target.reset();
  };

  return (
    <StForm onSubmit={addExpenseItem} $targetItem={targetItem ? true : false}>
      {expenseKoNameArr.map((item, i) => {
        if (item === "날짜") {
          return (
            <StDiv key={"div" + item} $targetItem={targetItem ? true : false}>
              <h4>{item.slice(-2)}</h4>
              <StInput
                key={item + selectedMonth}
                type="date"
                name={expenseEnNameArr[i]}
                placeholder={item}
                min="2024-01-01"
                max="2024-12-31"
                $valid={valid[i][`${expenseEnNameArr[i]}`]}
                defaultValue={
                  forEdit
                    ? targetItem[expenseEnNameArr[i]]
                    : "2024-" + selectedMonth + "-01"
                }
              />
              <StValidDiv $valid={valid[i][`${expenseEnNameArr[i]}`]}>
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
              name={expenseEnNameArr[i]}
              placeholder={item}
              $valid={valid[i][`${expenseEnNameArr[i]}`]}
              defaultValue={targetItem ? targetItem[expenseEnNameArr[i]] : null}
            />
            <StValidDiv $valid={valid[i][`${expenseEnNameArr[i]}`]}>
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
