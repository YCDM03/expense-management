import { useState, useContext } from "react";
import ExpenseForm from "../components/ExpenseForm";
import Calendar from "../components/Calendar";
import ExpenseList from "../components/ExpenseList";
import { StButton } from "../shared/FormComponent";
import { ListContext } from "../context/ListContext";

export default function Home() {
  const { list, setList } = useContext(ListContext);

  const month =
    new Date().getMonth() + 1 < 10
      ? "0" + (new Date().getMonth() + 1)
      : new Date().getMonth() + 1;

  const localMonth =
    localStorage.getItem("selectedMonth") ??
    localStorage.setItem("selectedMonth", month);

  const [selectedMonth, setSelectedMonth] = useState(localMonth);

  const arr = list.filter((el) => {
    return el.date.slice(5, 7) === selectedMonth;
  });
  const [monthList, setMonthList] = useState(arr);

  return (
    <>
      <div>
        <ExpenseForm selectedMonth={selectedMonth}>
          <StButton>저장</StButton>
        </ExpenseForm>
        <Calendar
          setMonthList={setMonthList}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <ExpenseList monthList={monthList} />
      </div>
    </>
  );
}
