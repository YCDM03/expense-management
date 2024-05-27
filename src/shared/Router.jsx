import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import { ListProvider } from "../context/ListContext";

const Router = () => {
  return (
    <BrowserRouter>
      <ListProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </ListProvider>
    </BrowserRouter>
  );
};

export default Router;
