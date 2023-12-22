import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import { useState } from "react";
import cucu from "../data/cucu.json";
import books from "../data/books.png";
import cottage from "../data/cottage.png";
import cloud from "../data/cloud.png";
import Lottie from "lottie-react";

interface MyFormVal {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const initialVal: MyFormVal = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className=" flex justify-center h-[110vh] sm:h-[120vh] bg-yellow-400 ">
      <Navbar />
      <div className="">
        <Lottie
          className=" lg:block hidden  h-32 absolute bottom-0 left-48 "
          animationData={cucu}
        />
        <img
          className=" hidden lg:block absolute h-64 sm:h-80  left-[-32px] top-[-64px]"
          src={cloud}
          alt="bookamin"
        />
        <img
          className=" hidden lg:block absolute h-24 sm:h-56 rotate-12 left-[-20px] bottom-[-5px]"
          src={books}
          alt="bookamin"
        />
        <img
          className=" hidden lg:block absolute h-80  right-0 bottom-[-16px]"
          src={cottage}
          alt="bookamin"
        />
      </div>
      <div className="  ">
        <Formik
          initialValues={initialVal}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required("Required!"),
            lastName: Yup.string().required("Required!"),
            email: Yup.string().required("Required!"),
            password: Yup.string().required("Required!"),
          })}
          onSubmit={async (values) => {
            const savedUserResponse = await fetch(
              "https://courseapp-lh7c.onrender.com/auth/register",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              }
            );
            const savedUser = await savedUserResponse.json();
            if (savedUser._id) {
              navigate("/login");
            } else {
              setAlert("Something went wrong!");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className=" z-20  sm:py-8  rounded  float-left mt-20 sm:mt-20 w-[94%] ml-3 flex flex-col  bg-gray-900">
              <p className=" sm:text-lg font-semibold sm:mr-3 text-center ml-1 mt-2 sm:ml-5 text-gray-400  mb-3  ">
                Publish your own Courses on Fabina School. Register Now!
              </p>
              <Field
                className="focus:outline-none  text-gray-300 bg-gray-500  m-4 px-4 sm:mx-10 py-3 mb-2 "
                id="firstName"
                name="firstName"
                placeholder="Firstname"
              />
              {errors.firstName && touched.firstName ? (
                <div className=" text-red-600 sm:ml-10  ml-4">
                  {errors.firstName}
                </div>
              ) : null}

              <Field
                className="focus:outline-none  text-gray-300 bg-gray-500  m-4 px-4 sm:mx-10 py-3 mb-2 "
                id="lastName"
                name="lastName"
                placeholder="Lastname"
              />
              {errors.lastName && touched.lastName ? (
                <div className=" text-red-600 sm:ml-10 ml-4">
                  {errors.lastName}
                </div>
              ) : null}

              <Field
                className="focus:outline-none  text-gray-300 bg-gray-500  m-4 px-4 sm:mx-10 py-3 mb-2 "
                id="email"
                name="email"
                placeholder="Email"
                type="email"
              />
              {errors.email && touched.email ? (
                <div className=" text-red-600 sm:ml-10 ml-4">
                  {errors.email}
                </div>
              ) : null}

              <Field
                className="focus:outline-none  text-gray-300 bg-gray-500 m-4 px-4 sm:mx-10 py-3 mb-2 "
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className=" text-red-600 sm:ml-10 ml-4">
                  {errors.password}
                </div>
              ) : null}

              <p className=" text-red-500 ml-4 sm:ml-10">{alert}</p>

              <button
                className=" text-white font-semibold bg-cyan-900 sm:mx-10 rounded m-4 mb-0 h-12 mt-7 focus:bg-red-800"
                type="submit"
              >
                Register
              </button>
              <p className=" ml-4 sm:ml-10 text-gray-300 sm:mt-3 mt-1 mb-4">
                Already have an Account&#63;
                <strong onClick={handleLogin} className=" cursor-pointer">
                  Login Here.
                </strong>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
