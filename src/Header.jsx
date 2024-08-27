import logo from "./assets/logo.png";
import { useCourses } from "./EnrolledCourses";

export default function Header() {
  const { enrolledCourses} = useCourses();
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolledCourses.length}</div>
    </div>
  );
}
