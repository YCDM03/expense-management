import styled from "styled-components";

const CalBox = styled.ul`
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

const MonthItem = styled.li`
  width: 180px;
  max-width: 180px;
  min-width: 90px;
  height: 30px;
  text-align: center;
  align-content: center;
  border: 1px solid gray;
  border-radius: 5px;
  &:hover {
    color: white;
    border: 1px solid white;
    background-color: #5b5bf5;
  }
`;

const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Calendar() {
  return (
    <CalBox>
      {monthArr.map((month) => {
        return <MonthItem key={month}>{month + " 월"}</MonthItem>;
      })}
    </CalBox>
  );
}
