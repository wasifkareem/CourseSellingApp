import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coursepage from "./pages/Coursepage";
import Register from "./pages/Register";
import UpdatePage from "./pages/UpdatePage";
import Login from "./pages/Login";
import Userpage from "./pages/Userpage";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

function App() {
  const isEducator = Boolean(
    useSelector((state: RootState) => state.user.educator.firstName)
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/coursepage/:id" element={<Coursepage />} />
        <Route path="/updatepage/:id" element={<UpdatePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mycourses"
          element={isEducator ? <Userpage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
