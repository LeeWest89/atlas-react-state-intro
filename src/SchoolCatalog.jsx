import { useState, useEffect } from 'react';
import { userEnrolledCourses } from './EnrolledCourses';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState({ key: '', direction: ''});
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;
  const { enrolledCourse} = userEnrolledCourses();

  useEffect(() => {
    fetch('/api/courses.json')
    .then(response => response.json())
    .then(data => setCourses(data));
  }, []);

  // handles the search
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // Sort
  const sortCourse = [...courses].sort((a, b) => {
    if (sortOrder.key) {
      const sortA = a[sortOrder.key].toString();
      const sortB = b[sortOrder.key].toString();
      if (sortA < sortB) {
        return (sortOrder.direction === 'ascending' ? -1 : 1);
      } else {
        return (sortOrder.direction === 'ascending' ? 1 : -1);
      }
    }
    return (0);
  });

    // Filter
    const filterCourses = sortCourse.filter((course) => {
      return (
        course.courseName.toLowerCase().includes(search.toLowerCase()) ||
        course.courseNumber.toLowerCase(). includes(search.toLowerCase())
      );
    });

  // Handle Sort
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortOrder.key === key && sortOrder.direction === 'ascending') {
      direction = 'descending';
    }
    setSortOrder({ key, direction });
  };

  // Pagination
  const currentPage = filterCourses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasMore = filterCourses.length > page * PAGE_SIZE;
  const hasLess = page > 1;


  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('trimester')}>Trimester</th>
            <th onClick={() => handleSort('courseNumber')}>Course Number</th>
            <th onClick={() => handleSort('courseName')}>Courses Name</th>
            <th onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
            <th onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {(currentPage.map((course, index) => (
            <tr key={index}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button onClick={() => enrolledCourse(course)}>Enroll</button>
              </td>
            </tr>
              ))
            )}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
