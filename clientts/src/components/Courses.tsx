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
          "https://fabinaschool.onrender.com/courses/"
        );
        setCourses(res.data);
      } catch (err) {}
    };
    getCourses();
  }, []);

  return (
    <div className=" flex flex-wrap py-20 sm:ml-12 sm:min-h-[100vh] ">
      {courses.map((item) => (
        <CourseCard item={item} key={item._id} />
      ))}
    </div>
  );
};

export default Courses;
