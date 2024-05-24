import styled from "styled-components";
import { useState } from "react";

const StCalUl = styled.ul`
  max-width: 1200px;
  min-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  border: 1px solid #5b5bf5;
  border-radius: 10px;
`;

const StMonthLi = styled.li`
  width: 180px;
  max-width: 180px;
  min-width: 90px;
  height: 30px;
  text-align: center;
  align-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: ${(props) => (props.$selected ? "#5b5bf5" : "transparent")};
  color: ${(props) => (props.$selected ? "white" : "black")};
  &:hover {
    color: white;
    border: 1px solid white;
    background-color: #5b5bf5;
  }
`;

const monthArr = [
  `01`,
  `02`,
  `03`,
  `04`,
  `05`,
  `06`,
  `07`,
  `08`,
  `09`,
  `10`,
  `11`,
  `12`,
];

export default function Calendar({
  list,
  setMonthList,
  selectedMonth,
  setSelectedMonth,
}) {
  const [select, setSelect] = useState(selectedMonth);

  const sortMonth = (month) => {
    const arr = [...list].filter((el) => {
      return el.date.slice(5, 7) === month;
    });
    setMonthList(() => arr);
  };

  return (
    <StCalUl>
      {monthArr.map((month, i) => {
        return (
          <StMonthLi
            key={month}
            onClick={() => {
              setSelect(() => month);
              sortMonth(month);
              localStorage.setItem("selectedMonth", month);
              setSelectedMonth(() => month);
            }}
            $selected={select === month ? true : false}
          >
            {month + " 월"}
          </StMonthLi>
        );
      })}
    </StCalUl>
  );
}
