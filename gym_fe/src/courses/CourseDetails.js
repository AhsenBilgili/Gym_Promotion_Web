import React, { useEffect, useState } from 'react';
import agent from '../api/agent';
import { useParams } from 'react-router-dom';
import ResponsiveAppBar from '../components/appbar';
import {
  Card,
  CardContent,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

export default function CourseDetails() {
  const { id } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const courseId = parseInt(id);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    agent.SpecialCourse.trainers()
      .then(trainers => setTrainers(trainers))
      .catch(error => console.error('Error fetching trainers:', error));
  }, []);

  useEffect(() => {
    agent.SpecialCourse.details(courseId)
      .then(details => setCourseDetails(details))
      .catch(error => console.error('Error fetching course details:', error.response));
  }, [id]);

  if (!courseDetails) {
    return <p>Loading...</p>;
  }

  // Filter trainers based on the special course name
  const matchingTrainers = trainers && trainers.filter(trainer => trainer.trainerDescription === courseDetails.specialCourseName);

  // Check if matchingTrainers is defined before mapping
  const trainerRows = matchingTrainers
    ? matchingTrainers.map((trainer) => (
        <TableRow key={trainer.id}>
          <TableCell>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={trainer.trainerImageUrl}
                alt={trainer.trainerName}
              />
              <CardContent>
                <Typography variant="h6">{trainer.trainerName}</Typography>
              </CardContent>
            </Card>
          </TableCell>
          <TableCell>{trainer.trainerName}</TableCell>
          <TableCell>
            <ul>
              {trainer.daySchedules.map((schedule) => (
                <li key={schedule.day}>
                  {`Day ${schedule.day}: ${schedule.startTime} - ${schedule.endTime}`}
                </li>
              ))}
            </ul>
          </TableCell>
        </TableRow>
      ))
    : null;

  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ width: '100%', height: '40vh', position: 'relative' }}>
        <img
          src={courseDetails?.specialCourseImgUrl}
          alt={courseDetails?.specialCourseName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: '5px',
            color: 'black',
            textTransform: 'uppercase',
            fontSize: '100px',
          }}
        >
          {courseDetails?.specialCourseName}
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>{courseDetails?.specialCourseCondition}</p>
      </div> <div style={{ marginTop: '20px' }}>
        <p>{courseDetails?.specialCourseDefinition}</p>
      </div>
      <div style={{ marginTop: '20px' }}>
        
      </div>
    </div>
  );
}
