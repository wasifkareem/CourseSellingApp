import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    educatorId: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
