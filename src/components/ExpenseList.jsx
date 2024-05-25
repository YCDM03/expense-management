import { Link } from "react-router-dom";
import { useContext } from "react";
import { ListContext } from "../context/ListContext";
import styled from "styled-components";

const StUl = styled.ul`
  max-width: 1200px;
  min-width: 500px;
  min-height: 500px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  border: 1px solid #5b5bf5;
  border-radius: 10px;
`;

const StLi = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  margin-bottom: 10px;
  background-color: #f6f6f6;
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.233);
`;

const StContentDiv = styled.div`
  width: 100%;
  font-weight: 700;
  margin-top: 10px;
  padding-bottom: 5px;
  display: flex;
  justify-content: space-between;
  color: #5b5bf5;
`;

const linkStyle = {
  textDecoration: "none",
  color: "none",
};

const StH3 = styled.h3`
  color: #fd009c;
`;

export default function ExpenseList({ monthList }) {
  const { list } = useContext(ListContext);
  const usedList = monthList === null ? list : monthList;
  return (
    <StUl>
      {usedList.map((el) => {
        const { id, date, type, price, detail } = el;
        return (
          <StLi key={id + list.length}>
            <Link style={linkStyle} to={"/edit/" + id} list={{ list }}>
              <StH3>{date}</StH3>
              <StContentDiv>
                <span>
                  {type}-{detail}
                </span>
                <span>{price}원</span>
              </StContentDiv>
            </Link>
          </StLi>
        );
      })}
    </StUl>
  );
}