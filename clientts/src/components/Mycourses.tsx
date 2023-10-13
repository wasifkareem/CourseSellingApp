import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Update from "./Update";
import { RootState } from "../app/store";
import { CourseData } from "./Courses";

const Mycourses = (refresh: any) => {
  const eduId = useSelector((state: RootState) => state.user.educator._id);
  const [reload, setReload] = useState<boolean>(false);
  const [updatecard, setUpdatecard] = useState<boolean>(false);
  const [rel, setRel] = useState<boolean>(false);
  const [courseInfo, setCourseInfo] = useState<any>("");
  const [courses, setCourses] = useState<CourseData>([]);
  const modifiedInfo = courses.find((item) => item._id == courseInfo._id);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(
          `https://fabinaschool.onrender.com/courses/user/${eduId}`
        );
        setCourses(res.data);
      } catch (err) {}
    };
    getCourses();
  }, [refresh, reload, rel]);

  const handleClose = () => {
    setUpdatecard(false);
  };

  return (
    <div className=" flex flex-wrap  sm:pt-14 border border-gray-400 sm:w-[54vw] sm:min-h-[100vh] sm:pl-0  ">
      {updatecard == false ? null : (
        <div className=" fixed w-[100vw] sm:h-[100vh] z-30 bg-white  ">
          <div className="flex">
            <AiOutlineCloseCircle
              onClick={handleClose}
              className=" bg-black hover:bg-red-800 rounded-lg m-1 text-white text-4xl p-2 cursor-pointer"
            />

            <div className="flex gap-4 m-5 border border-gray-400 rounded-lg overflow-hidden w-[47%]">
              <img
                className=" sm:h-32 sm:w-[230px]"
                src={modifiedInfo?.img}
                alt=""
              />
              <div>
                <h1 className=" text-2xl font-semibold mt-1">
                  {modifiedInfo?.title}
                </h1>
                <p className=" text-gray-600 mt-1 ">
                  {modifiedInfo?.desc.slice(0, 130)} .....
                </p>
              </div>
            </div>
          </div>

          <Update rel={rel} setRel={setRel} courseInfo={courseInfo} />
        </div>
      )}
      {courses.length == 0 ? (
        <p className=" sm:text-5xl text-2xl font-semibold ml-5 sm:h-fit sm:ml-28 sm:mt-52 text-purple-800 opacity-40 text-center border border-purple-700 rounded-lg mt-10 sm:w-96 p-4">
          Your courses will show here
        </p>
      ) : (
        courses.map((item) => (
          <CourseCard
            setCourseInfo={setCourseInfo}
            setUpdatecard={setUpdatecard}
            reload={reload}
            setReload={setReload}
            item={item}
            key={item._id}
          />
        ))
      )}
    </div>
  );
};

export default Mycourses;
