import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { EnrolledCourses } from "./EnrolledCourses";

export default function App() {
  return (
    <EnrolledCourses>
      <div>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </div>
    </EnrolledCourses>
  );
}
