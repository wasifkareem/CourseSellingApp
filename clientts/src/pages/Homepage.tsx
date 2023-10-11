import Navbar from "../components/Navbar";
import Courses from "../components/Courses";

const Homepage: React.FC<{}> = () => {
  return (
    <div className="bg-gradient-to-t from-slate-100 to-slate-300">
      <Navbar />

      <Courses />
    </div>
  );
};

export default Homepage;
