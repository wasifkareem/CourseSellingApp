import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CourseData } from "./Courses";

const Mycourses = (refresh: any) => {
  const eduId = useSelector((state: RootState) => state.user.educator._id);
  const [reload, setReload] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseData>([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(
          `https://coursesserver-ts.onrender.com/courses/user/${eduId}`
        );
        setCourses(res.data);
      } catch (err) {}
    };
    getCourses();
  }, [refresh, reload]);

  return (
    <div className=" flex flex-wrap sm:w-full sm:justify-center bg-[#dfeafd]  sm:min-h-[100vh] ">
      <div className=" sm:flex sm:flex-wrap  sm:w-[90%]">
        {courses.length == 0 ? (
          <p className=" sm:text-5xl text-2xl font-semibold ml-5 sm:h-fit text-purple-800 opacity-40 text-center border border-purple-700 rounded-lg mt-10 sm:w-96 p-4">
            Your courses will show here
          </p>
        ) : (
          courses.map((item) => (
            <CourseCard
              reload={reload}
              setReload={setReload}
              item={item}
              key={item._id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Mycourses;
