import { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import Calendar from "../components/Calendar";
import ExpenseList from "../components/ExpenseList";
import { StButton } from "../shared/FormComponent";

export default function Home({ list, setList }) {
  const month =
    new Date().getMonth() + 1 < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1;

  const localMonth =
    localStorage.getItem("selectedMonth") ??
    localStorage.setItem("selectedMonth", month);

  const [selectedMonth, setSelectedMonth] = useState(localMonth);

  return (
    <>
      <div>
        <ExpenseForm setList={setList} selectedMonth={selectedMonth}>
          <StButton>저장</StButton>
        </ExpenseForm>
        <Calendar
          list={list}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <ExpenseList list={list} selectedMonth={selectedMonth} />
      </div>
    </>
  );
}
