import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Create from "../components/Create";
import Mycourses from "../components/Mycourses";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import cucu from "../data/cucu.json";
import books from "../data/books.png";
import ladder from "../data/ladder.png";
import cloud from "../data/cloud.png";
import Lottie from "lottie-react";

const Userpage: React.FC<{}> = () => {
  const name = useSelector((state: RootState) => state.user.educator.firstName);
  const [refresh, setRefresh] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <div className=" relative overflow-hidden justify-center items-center flex  w-full h-[70vh] bg-gradient-to-b from-yellow-500 to-red-500">
        <Lottie
          className=" lg:block hidden  h-32 absolute bottom-0 "
          animationData={cucu}
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
          className=" absolute h-64  right-[-20px] bottom-[-16px]"
          src={ladder}
          alt="bookamin"
        />
        <div className=" z-20 flex flex-col sm:w-3/6 sm:px-10 sm:py-8 px-5 py-3 mx-5 bg-gray-900 rounded font-semibold text-base text-gray-300 h-3/5 ">
          <p className=" font-bold text-2xl text-gray-100 mb-4">Hey, {name}</p>
          <p>Welcome to Fabina</p>
          <p>
            Do you love teaching complex concepts and skills in byte size
            tutorials and lecture?
          </p>
          <p>
            Start sharing mini tutorials with the world and be a part of our
            journey
          </p>
        </div>
      </div>
      <div className=" flex flex-col  ">
        <Create setRefresh={setRefresh} refresh={refresh} />

        <section className=" sm:w-full  ">
          <div className=" flex bg-purple-600 py-3 text-white font-semibold  pl-4 text-2xl ">
            Your Courses
          </div>
          <Mycourses refresh={refresh} />
        </section>
      </div>
    </>
  );
};

export default Userpage;
