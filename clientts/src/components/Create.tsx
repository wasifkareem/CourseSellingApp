import { Formik, Field, Form, useField } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useState } from "react";

interface ToogleProps {
  refresh: boolean;
  setRefresh: (newValue: boolean) => void;
}

interface FormVal {
  title: string;
  desc: string;
  videoFile: string;
  imgFile: string;
}

const Create = ({ refresh, setRefresh }: ToogleProps) => {
  const initialValues: FormVal = {
    title: "",
    desc: "",
    videoFile: "",
    imgFile: "",
  };
  const educatorId = useSelector((state: any) => state.user.educator._id);
  const firstName = useSelector((state: any) => state.user.educator.firstName);
  const lastName = useSelector((state: any) => state.user.educator.lastName);

  //VIDEO HANDLE
  const [selectedFile, setSelectedFile] = useState<any>();
  const [preview, setPreview] = useState<any>();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const maxSize = 50 * 1024 * 1024;

    if (file && file.size > maxSize) {
      alert("max size allowed is 50MB");
    } else {
      setPreview(url);
      setSelectedFile(e.target.files[0]);
    }
  };

  //IMG HANDLE
  const [ImgFile, setImgFile] = useState<any>();
  const [imgPreview, setImgPreview] = useState<any>();
  const handleImage = (e: any) => {
    setImgFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImgPreview(url);
  };

  return (
    <div>
      <div className="  ">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object().shape({
            title: Yup.string().required("Required!"),
            desc: Yup.string().required("Required!"),
            videoFile: Yup.string(),
            imgFile: Yup.string(),
          })}
          onSubmit={async (values: any, { resetForm }) => {
            const formData = new FormData();
            for (let value in values) {
              formData.append(value, values[value]);
            }
            formData.append("videoFile", selectedFile);
            formData.append("videoPath", selectedFile.name);
            formData.append("educatorId", educatorId);
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("imgPath", ImgFile.name);
            formData.append("imgFile", ImgFile);

            const res = await fetch(
              "https://coursesserver-ts.onrender.com/courses/addCourse",
              {
                method: "POST",

                body: formData,
              }
            );
            const savedUser = await res.json();
            if (savedUser._id) {
              if (savedUser) {
                setRefresh(refresh == false ? true : false);
              }
              resetForm();
            }
          }}
        >
          {() => (
            <Form className="  bg-gray-900 w-full pb-3  flex flex-col sm:mx-0  sm:w-full   ">
              <p className=" sm:text-lg font-semibold sm:mr-3 ml-4 mt-2 sm:ml-5  text-gray-100  bg-red-600 w-fit px-3 rounded  ">
                Course Details.
              </p>
              <div className=" sm:flex sm:flex-col sm:items-center">
                <div className=" sm:flex sm:flex-col  mx-3 sm:w-[70%]   ">
                  <Field
                    className="focus:outline-none   text-gray-200  mt-4 px-4 w-full  py-2 sm:py-4  mb-3   bg-gray-700"
                    id="title"
                    name="title"
                    placeholder="Title"
                  />

                  <MyTextArea
                    className="focus:outline-none  text-gray-200 w-full h-24 sm:h-56 px-4  py-2 mb-2  bg-gray-700"
                    id="desc"
                    name="desc"
                    placeholder="desc"
                    label={null}
                  />
                </div>
                <div className=" sm:flex sm:w-[70%] ">
                  <div className="  flex flex-col sm:w-1/2  border-gray-500   bg-gray-700 mx-3 sm:mx-0 p-3  ">
                    {preview ? (
                      <video className=" mb-2" controls src={preview}></video>
                    ) : (
                      <div className=" flex justify-center items-center border border-gray-500 border-dashed h-44 sm:h-56 mb-2 text-xl font-semibold text-gray-500 ">
                        Video Preview
                      </div>
                    )}
                    <input
                      className=" text-gray-400"
                      name="videoFile"
                      type="file"
                      onChange={handleFileChange}
                      accept=".mov,.mp4"
                    />
                  </div>
                  <div className=" mt-2 sm:mt-0 flex flex-col sm:w-1/2  bg-gray-700 sm:mr-0 mx-3 p-3">
                    {imgPreview ? (
                      <img className=" mb-2" src={imgPreview} alt="" />
                    ) : (
                      <div className=" flex justify-center items-center border border-gray-500 border-dashed h-44 sm:h-56 mb-2 text-xl font-semibold text-gray-500">
                        Thumbnail Preview
                      </div>
                    )}
                    <input
                      className=" text-gray-400"
                      name="imgFile"
                      type="file"
                      onChange={handleImage}
                      accept=".jpg,.jpeg,.png"
                    />
                  </div>
                </div>
              </div>
              <button
                className="  px-4 text-white font-semibold w-fit bg-blue-600  rounded-3xl m-4 mb-3 h-12 mt-7 hover:bg-red-800"
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

export default Create;
