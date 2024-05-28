import { useParams, Link } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { StButton } from "../shared/FormComponent";
import { useDispatch, useSelector } from "react-redux";
import { deleteList } from "../redux/slices/listSlice";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export default function Edit() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const params = useParams();
  const targetItem = list.find((e) => {
    return e.id === params.id;
  });
  const editState = true;

  return (
    <ExpenseForm editState={editState} targetItem={targetItem} id={params.id}>
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
            dispatch(deleteList(targetItem));
          }}
        >
          삭제
        </StButton>
      </Link>
    </ExpenseForm>
  );
}
