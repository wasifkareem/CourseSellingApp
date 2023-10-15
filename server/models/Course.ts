import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    educatorId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    videoPath: {
      type: String,
      default: "",
    },
    imgPath: {
      type: String,
      default: "",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
