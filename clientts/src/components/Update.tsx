import { Formik, Field, Form, useField } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

interface UpdateProps {
  rel: boolean;
  setRel: (newValue: boolean) => void;
  courseInfo: any;
}

const Update = ({ rel, setRel, courseInfo }: UpdateProps) => {
  const educatorId = useSelector((state: RootState) => state.user.educator._id);
  const firstName = useSelector(
    (state: RootState) => state.user.educator.firstName
  );
  const lastName = useSelector(
    (state: RootState) => state.user.educator.lastName
  );

  return (
    <div>
      <div className="  ">
        <Formik
          initialValues={{
            title: "",
            desc: "",
            img: "",
            price: "",
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Required!"),
            desc: Yup.string().required("Required!"),
            img: Yup.string().required("Required!"),
            price: Yup.string().required("Required!"),
          })}
          onSubmit={async (values, { resetForm }) => {
            const info = values;
            const data = {
              title: info.title,
              desc: info.desc,
              img: info.img,
              price: info.price,
              educatorId: educatorId,
              firstName: firstName,
              lastName: lastName,
            };
            const res = await fetch(
              `https://coursesserver-ts.onrender.com/courses/update/${courseInfo._id}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },

                body: JSON.stringify(data),
              }
            );
            const savedUser = await res.json();
            if (savedUser._id) {
              resetForm();
              setRel(rel == false ? true : false);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="  rounded border-gray-400 border  float-left mt-16 sm:mt-0 sm:ml-7 w-[93vw] pb-3  flex flex-col sm:mx-0  sm:w-[690px] sm:max-h-[65vh]  bg-gray-200">
              <p className=" sm:text-lg font-semibold sm:mr-3 ml-4 mt-2 sm:ml-5  text-gray-100  bg-purple-700 w-fit px-3 rounded  ">
                Update Course .
              </p>
              <Field
                className="focus:outline-none rounded-lg  mx-3 mt-4 px-4 sm:mx-10 py-2 mb-2 border border-gray-500 bg-gray-200"
                id="title"
                name="title"
                placeholder="title"
              />
              {errors.title && touched.title ? (
                <div className=" text-red-600 sm:ml-10  ml-4">
                  {errors.title}
                </div>
              ) : null}

              <MyTextArea
                className="focus:outline-none rounded-lg  mx-3 h-24 px-4 sm:mx-10 py-2 mb-2 border border-gray-500 bg-gray-200"
                id="desc"
                name="desc"
                placeholder="desc"
                label={null}
              />
              {errors.desc && touched.desc ? (
                <div className=" text-red-600 sm:ml-10 ml-4">{errors.desc}</div>
              ) : null}

              <Field
                className="focus:outline-none rounded-lg  mx-3 px-4 sm:mx-10 py-2 mb-2 border border-gray-500 bg-gray-200"
                id="img"
                name="img"
                placeholder="img"
                type="img"
              />
              {errors.img && touched.img ? (
                <div className=" text-red-600 sm:ml-10 ml-4">{errors.img}</div>
              ) : null}

              <Field
                className="focus:outline-none rounded-lg  mx-3 px-4 sm:mx-10 py-2 mb-2 border border-gray-500 bg-gray-200"
                id="price"
                name="price"
                placeholder="price"
                type="price"
              />
              {errors.price && touched.price ? (
                <div className=" text-red-600 sm:ml-10 ml-4">
                  {errors.price}
                </div>
              ) : null}

              {/* <p className=" text-red-500 ml-4 sm:ml-10">{alert}</p> */}

              <button
                className=" text-white font-semibold bg-cyan-900 sm:mx-10 rounded m-4 mb-0 h-12 mt-7 hover:bg-red-800"
                type="submit"
              >
                Publish
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const MyTextArea = ({ label, ...props }: any) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <textarea className="text-area" {...field} {...props} />
    </>
  );
};

export default Update;
