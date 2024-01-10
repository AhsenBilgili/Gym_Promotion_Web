import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveAppBar from '../components/appbar';
import agent from '../api/agent';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    agent.SpecialCourse.list()
      .then(courses => setCourses(courses))
      .catch(error => console.error('Error fetching facilities:', error));
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {courses && courses.length > 0 ? (
          courses.map(course => (
            <Link
              to={`/specialcourses/${course.id}`}
              key={course.id}
              style={{ ...cardStyle, textDecoration: 'none' }}  // Remove underline
            >
              <img src={course.specialCourseImgUrl} alt={course.specialCourseName} style={imageStyle} />
              <p style={courseNameStyle}>{course.specialCourseName.toUpperCase()}</p>
            </Link>
            
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
}

const cardStyle = {
  width: '200px',
  height: '80vh',  // Adjusted height
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '10px',
  padding: '10px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',  // Display image and text vertically
};

const imageStyle = {
  width: '100%',
  height: '100%',  // Adjusted height
  objectFit: 'cover',
  borderRadius: '8px',
};

const courseNameStyle = {
  color: 'white',  // White color
  textTransform: 'uppercase',  // Uppercase text
  margin: '0',  // Remove default margin
};
