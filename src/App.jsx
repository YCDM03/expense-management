import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import Calendar from "./components/Calendar";

function App() {
  const [list, setList] = useState([
    {
      id: 0,
      date: "2024-01-01",
      type: "식비",
      price: 10000,
      detail: "칼국수",
    },
  ]);

  return (
    <>
      <div>
        <ExpenseForm setList={setList}></ExpenseForm>
        <Calendar></Calendar>
      </div>
    </>
  );
}

export default App;
