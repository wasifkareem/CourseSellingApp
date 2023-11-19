import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import { useState } from "react";
import cucu from "../data/cucu.json";
import books from "../data/books.png";
import ladder from "../data/ladder.png";
import cloud from "../data/cloud.png";
import Lottie from "lottie-react";

interface MyFormVal {
  email: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = useState("");
  const initialValues: MyFormVal = { email: "", password: "" };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className=" flex justify-center h-[100vh] bg-purple-700 ">
      <Navbar />
      <div className="">
        <Lottie
          className=" lg:block hidden  h-32 absolute bottom-0 left-48 "
          animationData={cucu}
        />
        <img
          className=" hidden lg:block absolute h-80  right-[-32px] top-0"
          src={cloud}
          alt="bookamin"
        />
        <img
          className=" hidden lg:block absolute h-24 sm:h-56 rotate-12 left-[-20px] bottom-0"
          src={books}
          alt="bookamin"
        />
        <img
          className=" hidden lg:block absolute h-64  right-0 bottom-0"
          src={ladder}
          alt="bookamin"
        />
      </div>
      <div className="  ">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            email: Yup.string().required("Required!"),
            password: Yup.string().required("Required!"),
          })}
          onSubmit={async (values) => {
            try {
              const headers = {
                "Content-Type": "application/json",
              };
              const res = await axios.post(
                "https://coursesserver-ts.onrender.com/auth/login",
                JSON.stringify(values),
                { headers }
              );

              dispatch(loginSuccess(res.data));
              if (res.data._id) {
                navigate("/mycourses");
              }
            } catch (err) {
              setAlert("Something went wrong!");
              console.log(err);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="z-20 sm:py-8  rounded  float-left mt-20 sm:mt-20 sm:w-[500px] w-full  flex flex-col  bg-gray-900">
              <p className=" font-semibold ml-4 mt-2 sm:ml-5  text-gray-400  mb-3 sm:text-xl">
                {" "}
                Welcome to Fabina School.
              </p>
              <Field
                className="focus:outline-none  text-gray-300 bg-gray-500  m-4 px-4 sm:mx-10 py-3 mb-2 "
                id="email"
                name="email"
                placeholder="Enter your Email here.."
                type="email"
              />
              {errors.email && touched.email ? (
                <div className=" text-red-600 ml-4">{errors.email}</div>
              ) : null}

              <Field
                className="focus:outline-none  text-gray-300 bg-gray-500  m-4 px-4 sm:mx-10 py-3 mb-2 "
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className=" text-red-600 ml-4">{errors.password}</div>
              ) : null}

              <p className=" ml-4 text-red-600">{alert}</p>

              <button
                className=" text-white font-semibold bg-cyan-900 sm:ml-10 sm:w-[420px] m-4 mb-0 h-12 mt-7 focus:bg-red-800"
                type="submit"
              >
                Login
              </button>
              <p className=" sm:ml-10 mx-4 mt-1 mb-4 text-gray-300">
                Don&#39;t have an Account&#63;{" "}
                <strong onClick={handleRegister} className=" cursor-pointer">
                  Signup Here.
                </strong>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
