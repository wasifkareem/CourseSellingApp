import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";

interface ItemVal {
  educatorId: string;
  title: string;
  desc: string;
  img: string;
  price: number;
  firstName: string;
  lastName: string;
  _id: string;
}

export type CourseData = ItemVal[];

const Courses = () => {
  const [courses, setCourses] = useState<CourseData>([]);
  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(
          "https://courseapp-lh7c.onrender.com/courses/"
        );
        setCourses(res.data);
      } catch (err) {}
    };
    getCourses();
  }, []);

  return (
    <div className=" shadow-2xl flex bg-[#dfeafd] flex-wrap pb-20 sm:justify-center  sm:min-h-[100vh] ">
      <div className=" sm:flex sm:flex-wrap sm:w-[90%] ">
        {courses.map((item) => (
          <CourseCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
