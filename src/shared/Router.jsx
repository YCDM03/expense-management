import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import { ListContext } from "../context/ListContext";

const Router = () => {
  const fakeData = [
    {
      id: "25600f72-56b4-41a7-a9c2-47358580e2f8",
      date: "2024-01-05",
      type: "식비",
      price: 100000,
      detail: "세광양대창",
    },
    {
      id: "25600f72-53b4-4187-a9c2-47358580e2f8",
      date: "2024-01-10",
      type: "도서",
      price: 40500,
      detail: "모던 자바스크립트",
    },
    {
      id: "24310f72-56b4-41a7-a9c2-458580ef1f8",
      date: "2024-02-02",
      type: "식비",
      price: 50000,
      detail: "회식",
    },
    {
      id: "25600f72-99b4-41z7-e4h6-47312365e2f8",
      date: "2024-02-02",
      type: "간식",
      price: 500,
      detail: "아이스크림",
    },
    {
      id: "25143e72-16e2-22a7-a9c2-47358580e2f8",
      date: "2024-02-02",
      type: "여행",
      price: 1055000,
      detail: "일본여행",
    },
    {
      id: "25600f72-97p2-14a7-a9c2-47363950e2t8",
      date: "2024-02-02",
      type: "미용",
      price: 155000,
      detail: "미용실",
    },
    {
      id: "24312f70-97q2-14a7-a9c2-47132950e2t8",
      date: "2024-02-02",
      type: "도서",
      price: 75000,
      detail:
        "자율주행차량 운전주행모드 자동 전환용 인식률 90% 이상의 다중 센서 기반 운전자 상태 인식 및 상황 인식 원천 기술 개발",
    },
  ];
  const [list, setList] = useState(fakeData);
  return (
    <BrowserRouter>
      <ListContext.Provider value={{ list, setList }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </ListContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
