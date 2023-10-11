import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import { useState } from "react";

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
    <div className=" h-[100vh] bg-gradient-to-br from-slate-300 to-slate-800 ">
      <Navbar />

      <div className=" border ">
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
                "https://fabinaschool.onrender.com/auth/login",
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
            <Form className=" sm:w-1/3 sm:ml-[450px]  float-left mt-32 w-[94%] ml-3 flex flex-col  bg-white">
              <p className=" font-semibold ml-4 mt-2 sm:ml-5 animate-pulse text-slate-900  mb-3 sm:text-xl">
                {" "}
                Welcome to Fabina School.
              </p>
              <Field
                className="focus:outline-none rounded-lg  m-4 px-4 py-3 mb-2 border border-gray-300"
                id="email"
                name="email"
                placeholder="Enter your Email here.."
                type="email"
              />
              {errors.email && touched.email ? (
                <div className=" text-red-600 ml-4">{errors.email}</div>
              ) : null}

              <Field
                className="focus:outline-none rounded-lg m-4 px-4 py-3 mb-2 border border-gray-300"
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
                className=" text-white font-semibold bg-cyan-900 rounded m-4 mb-0 h-12 mt-7 focus:bg-red-800"
                type="submit"
              >
                Login
              </button>
              <p className=" ml-4 mt-1 mb-4">
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
