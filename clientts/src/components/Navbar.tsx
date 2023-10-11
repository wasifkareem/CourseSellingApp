import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { RootState } from "../app/store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUser = Boolean(
    useSelector((state: RootState) => state.user.educator.firstName)
  );
  console.log(isUser);

  const handleClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const loginHandle = () => {
    navigate("/login");
  };

  const courseHandle = () => {
    navigate("/mycourses");
  };

  const homeHandle = () => {
    navigate("/");
  };

  const handleReg = () => {
    navigate("/register");
  };
  return (
    <div className=" fixed w-full z-10 bg-white  flex justify-between items-center h-14 border border-gray-500 rounded-b-lg">
      <div
        className=" cursor-pointer italic text-black font-bold sm:text-3xl text-lg  pl-2 sm:pl-3"
        onClick={handleClick}
      >
        Fabina School
      </div>

      <div className=" flex">
        <button
          onClick={homeHandle}
          className=" ease-in duration-500 hidden lg:block border px-2 py-1 mr-2 sm:mr-5 border-gray-600 text-gray-600 font-semibold cursor-pointer rounded hover:bg-gray-600 hover:border-none hover:transition hover:text-white"
        >
          Home
        </button>
        {isUser ? (
          <>
            <button
              onClick={courseHandle}
              className="ease-in duration-500 border px-2 py-1 mr-2 sm:mr-5 border-gray-600 text-gray-600 font-semibold cursor-pointer rounded text-xs sm:text-base hover:bg-gray-600 hover:border-none hover:transition hover:text-white"
            >
              My courses
            </button>
            <button
              onClick={handleLogout}
              className="ease-in duration-500 border px-2 sm:text-base py-1 mr-2 sm:mr-5 border-gray-600 text-gray-600 font-semibold cursor-pointer rounded text-xs hover:bg-gray-600 hover:border-none hover:transition hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleReg}
              className="ease-in duration-500 border px-2 py-1 sm:text-base mr-2 sm:mr-5 border-gray-600 text-gray-600 font-semibold cursor-pointer rounded text-xs hover:bg-gray-600 hover:border-none hover:transition hover:text-white"
            >
              Publish Courses
            </button>

            <button
              onClick={loginHandle}
              className=" hidden lg:block ease-in duration-500 border px-2 py-1 mr-2 sm:mr-5 border-gray-600 text-gray-600 font-semibold cursor-pointer rounded hover:bg-gray-600 hover:border-none hover:transition hover:text-white"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
