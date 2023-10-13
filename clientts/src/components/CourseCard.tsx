import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

const CourseCard: React.FC<any> = ({
  setCourseInfo,
  setUpdatecard,
  reload,
  setReload,
  item,
}) => {
  const navigate = useNavigate();
  const ifHome = useLocation();

  const handleClick = () => {
    navigate(`/coursepage/${item._id}`);
  };

  const handleDel = async () => {
    try {
      const res = await axios.delete(
        `https://fabinaschool.onrender.com/courses/delete/${item._id}`
      );

      if (res.data.educatorId) {
        setReload(reload == false ? true : false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () => {
    setUpdatecard(true);
    setCourseInfo(item);
  };
  return (
    <div className="  cursor-pointer scale-[0.99] hover:scale-[1.01] ease-in duration-500 hover:border-gray-500 hover:transition hover:border  bg-neutral-100 shadow-xl border-gray-300 border mt-3  rounded-md overflow-hidden h-fit pb-4 w-[94%] ml-2 sm:w-[300px]">
      {ifHome.pathname == "/" ? null : (
        <MdDeleteForever
          onClick={handleDel}
          className=" text-5xl mr-4 absolute bg-white hover:bg-red-700 hover:text-white duration-500 rounded-br-3xl p-2"
        />
      )}

      <img
        onClick={handleClick}
        className=" h-52 object-cover min-w-full"
        src={item.img}
        alt="python course"
      />
      <div>
        <div
          onClick={handleClick}
          className=" flex items-center justify-between "
        >
          <h1 className="  text-xl font-semibold ml-3 mt-2">{item.title}</h1>
        </div>

        <p onClick={handleClick} className=" mt-1 mx-3 text-gray-600">
          {item.desc.slice(0, 60)}...
        </p>
        <div className="flex  mt-10 mr-4 justify-between items-center sm:text-base  font-semibold text-xl ">
          {ifHome.pathname == "/mycourses" ? null : (
            <p className=" ml-4 font-semibold w-fit bg-teal-900 px-3 rounded text-gray-200 py-1  ">
              {item.firstName} {item.lastName}
            </p>
          )}
          {ifHome.pathname == "/" ? null : (
            <button
              onClick={handleUpdate}
              className=" ml-4 font-semibold w-fit bg-black px-3 rounded text-gray-200 py-1  "
            >
              update info
            </button>
          )}

          <p onClick={handleClick}> ${item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
