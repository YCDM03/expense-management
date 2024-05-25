import { useParams, Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { StButton } from "../shared/FormComponent";
import { useContext } from "react";
import { ListContext } from "../context/ListContext";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export default function Edit() {
  const { list, setList } = useContext(ListContext);

  const params = useParams();
  const targetItem = list.find((e) => {
    return e.id === params.id;
  });
  const restList = list.filter((e) => {
    return e.id !== params.id;
  });
  const editState = true;

  return (
    <>
      <ExpenseForm
        restList={restList}
        editState={editState}
        targetItem={targetItem}
        id={params.id}
      >
        <Link to={"/"} style={linkStyle}>
          <StButton type="button">메인으로</StButton>
        </Link>
        <StButton>수정</StButton>
        <Link to={"/"} style={linkStyle}>
          <StButton
            type="button"
            onClick={() => {
              const real = confirm("정말로 삭제하시겠습니까?");
              if (real) {
                alert("삭제되었습니다.");
              }
              setList(() => [...restList]);
            }}
          >
            삭제
          </StButton>
        </Link>
      </ExpenseForm>
    </>
  );
}
