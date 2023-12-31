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
  videoPath: string;
};
const Coursepage: React.FC<{}> = () => {
  const location = useLocation();
  const courseid = location.pathname.split("/")[2];
  const [courseInfo, setCourseInfo] = useState<Course>();

  useEffect(() => {
    const courseDetail = async () => {
      try {
        const res = await axios.get(
          `https://courseapp-lh7c.onrender.com/courses/${courseid}`
        );

        setCourseInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    courseDetail();
  }, []);

  return (
    <div className="bg-[#efe9ba]">
      <Navbar />

      <div className="sm:flex pb-5">
        <div className=" sm:w-1/2 w-full  pt-20 sm:pl-5 sm:ml-3 sm:h-[98vh] rounded-lg sm:rounded-none bg-gray-900 ">
          <video
            className=" w-[95%] h-[63%] rounded-xl mx-2  shadow-custom-blue  "
            controls
            src={`${courseInfo?.videoPath}`}
          />
        </div>
        <div className="  flex flex-col mt-2 sm:w-1/2">
          <h1 className=" mt-4 mx-2 sm:text-5xl text-3xl font-semibold text-gray-800 first-letter:uppercase sm:mt-24 mb-5 sm:mb-10 sm:ml-10">
            {courseInfo?.title}
          </h1>
          <div className=" flex flex-col justify-between  min-h-[250px] sm:min-h-[350px] ">
            <p className="first-letter:uppercase ml-4 text-gray-800 mr-3 sm:ml-10 sm:mr-28 mt-3">
              {courseInfo?.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursepage;
