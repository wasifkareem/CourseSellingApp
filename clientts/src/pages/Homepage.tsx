import Navbar from "../components/Navbar";
import Courses from "../components/Courses";
import cucu from "../data/cucu.json";
import students from "../data/students.json";
import books from "../data/books.png";
import ladder from "../data/ladder.png";
import cloud from "../data/cloud.png";
import Lottie from "lottie-react";

const Homepage: React.FC<{}> = () => {
  return (
    <div className="">
      <Navbar />
      <div className=" relative overflow-hidden justify-center items-center flex  w-full h-[70vh] bg-blue-600">
        <Lottie
          className=" lg:block hidden  h-32 absolute bottom-0 "
          animationData={cucu}
        />
        <Lottie
          className=" lg:block hidden h-56 absolute right-24 top-16"
          animationData={students}
        />
        <img
          className=" absolute h-64  left-[-32px] top-[-64px]"
          src={cloud}
          alt="bookamin"
        />
        <img
          className=" absolute h-24 sm:h-44 rotate-12 left-[-20px] bottom-[-5px]"
          src={books}
          alt="bookamin"
        />

        <img
          className=" absolute h-44  right-[-20px] bottom-[-16px]"
          src={ladder}
          alt="bookamin"
        />
        <div className=" z-20 flex flex-col sm:w-3/6 sm:px-10 sm:py-8 px-5 py-3 mx-5 bg-gray-900 rounded font-semibold text-base text-gray-400 h-3/5 ">
          <p className=" font-bold text-2xl text-gray-100 mb-4">
            Welcome to Fabina.
          </p>
          <p>
            Fabina offers a unique opportunity to master real-life skills and
            delve into complex concepts through bite-sized tutorials and
            courses. With us, you can upskill yourself for a better future, all
            at absolutely no cost.{" "}
            <span className=" hidden lg:block">
              Explore a world of knowledge tailored to your needs and embark on
              a journey towards personal and professional growth
            </span>
          </p>
          <p></p>
        </div>
      </div>
      <div className=" flex bg-yellow-500 py-3 text-white font-semibold  pl-4 text-2xl ">
        Our Courses
      </div>
      <Courses />
    </div>
  );
};

export default Homepage;
