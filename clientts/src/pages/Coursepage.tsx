import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

type Course = {
  educatorId: string;
  title: string;
  desc: string;
  img: string;
  price: number;
  firstName: string;
  lastName: string;
};
const Coursepage: React.FC<{}> = () => {
  const location = useLocation();
  const courseid = location.pathname.split("/")[2];
  const [courseInfo, setCourseInfo] = useState<Course>();

  useEffect(() => {
    const courseDetail = async () => {
      try {
        const res = await axios.get(
          `https://fabinaschool.onrender.com/courses/${courseid}`
        );

        setCourseInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    courseDetail();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="sm:flex pb-5">
        <div className=" pt-20 sm:pt-3 mx-3 shadow sm:mt-16 sm:ml-10">
          <img
            className=" w-full sm:min-w-[600px] sm:h-[400px]"
            src={courseInfo?.img}
            alt="cspic"
          />
        </div>
        <div className="  flex flex-col">
          <h1 className=" mt-4 ml-4 text-4xl font-semibold sm:mt-16 sm:ml-10">
            {courseInfo?.title}
          </h1>
          <div className=" flex flex-col justify-between  min-h-[250px] sm:min-h-[350px] ">
            <p className=" ml-4 mr-3 sm:ml-10 sm:mr-28 mt-3">
              {courseInfo?.desc}
            </p>
            <p className="  ml-4  font-semibold text-3xl py-2 px-3  text-gray-600 border rounded-md border-cyan-400 w-fit sm:ml-10">
              ${courseInfo?.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursepage;
