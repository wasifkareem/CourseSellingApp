import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";
import { RootState } from "../app/store";
import navsticker from "../data/navsticker.png";

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
    <div className=" fixed w-full z-50 bg-white  flex justify-between items-center h-14  rounded-b-lg">
      <div
        className=" flex items-center cursor-pointer italic text-black font-bold sm:text-3xl text-lg  pl-2 sm:pl-3"
        onClick={handleClick}
      >
        <img className=" h-10 mr-1" src={navsticker} alt="" />
        Fabina School
      </div>

      <div className=" flex">
        <button
          onClick={homeHandle}
          className=" ease-in  duration-300 hidden lg:block  px-2 py-1 mr-2 sm:mr-5  border shadow text-gray-800 font-semibold cursor-pointer rounded shadow-gray-400  hover:bg-gray-900  hover:transition hover:text-white"
        >
          Home
        </button>
        {isUser ? (
          <>
            <button
              onClick={courseHandle}
              className="ease-in  duration-300 border  shadow px-2 py-1 mr-2 sm:mr-5  text-gray-800 font-semibold cursor-pointer shadow-gray-400 rounded text-xs sm:text-base  hover:bg-gray-900  hover:transition hover:text-white"
            >
              My courses
            </button>
            <button
              onClick={handleLogout}
              className="ease-in  duration-300 border px-2 sm:text-base py-1 mr-2 sm:mr-5 text-gray-800 font-semibold cursor-pointer rounded text-xs  shadow shadow-gray-400 hover:bg-gray-900  hover:transition hover:text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleReg}
              className="ease-in  duration-300 border shadow px-2 py-1 sm:text-base mr-2 sm:mr-5 text-gray-900 font-semibold cursor-pointer rounded text-xs shadow-gray-400  hover:bg-gray-900  hover:transition hover:text-white"
            >
              Publish Courses
            </button>

            <button
              onClick={loginHandle}
              className=" hidden lg:block ease-in  duration-300 border px-2 py-1 mr-2 sm:mr-5 border-gray-500 text-gray-800 font-semibold cursor-pointer rounded  shadow-gray-400 hover:bg-gray-900  hover:transition hover:text-white"
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
