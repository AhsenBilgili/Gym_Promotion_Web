import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/appbar';
import agent from '../api/agent';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';

export default function Prices() {
  const { id } = useParams();
  const courseId = parseInt(id, 10);

  const [prices, setPrices] = useState([]);
  const [courses, setCourses] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedCourseLong, setSelectedCourseLong] = useState('');

  useEffect(() => {
    agent.Prices.list()
      .then(prices => setPrices(prices))
      .catch(error => console.error('Error fetching prices:', error));

    agent.Prices.courseslist()
      .then(coursesList => {
        setCoursesList(coursesList);
      })
      .catch(error => console.error('Error fetching prices:', error));

    agent.Prices.paymentDetail()
      .then(paymentTypes => setPaymentTypes(paymentTypes))
      .catch(error => console.error('Error fetching payment types:', error));
  }, []);

  useEffect(() => {
    if (selectedCourseId !== '') {
      agent.Prices.courses(selectedCourseId)
        .then(courses => {
          console.log('Courses:', courses);
          setCourses(courses);
        })
        .catch(error => {
          console.error('Error fetching courses:', error);
        });
    }
  }, [selectedCourseId]);

  const handlePaymentTypeChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  const handleCourseNameChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCourseId(selectedId);

    const selectedCourse = Array.isArray(courses) ? courses.find(course => course.courseId === selectedId) : null;
    setSelectedCourseLong(selectedCourse ? selectedCourse.courseName : '');
  };

  const handleCourseLongChange = (event) => {
    setSelectedCourseLong(event.target.value);
  };

  const uniqueCourseIds = Array.from(new Set(prices.map(data => data.courseId)));
  const uniqueCourseNames = Array.from(new Set(coursesList.map(data => data.courseName)));
  const uniqueCourseLongs = Array.from(new Set(prices.map(data => data.courseLong)));
  const isAllSelectionsMade = selectedPaymentType !== '' && selectedCourseId !== '' && selectedCourseLong !== '';

  const filteredPrices = prices.filter(data => {
    const matchesPaymentType = selectedPaymentType === '' || data.paymentTypeId === selectedPaymentType;
    const matchesCourseName = selectedCourseId === '' || data.courseId === selectedCourseId;
    const matchesCourseLong = selectedCourseLong === '' || data.courseLong === selectedCourseLong;

    return matchesPaymentType && matchesCourseName && matchesCourseLong;
  });

  return (
    <div>
      <ResponsiveAppBar />

      <Grid container spacing={2} alignItems={'center'} justifyContent={'center'} style={{ marginTop: '20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <p>Lütfen seçim yapınız</p>
          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="payment-type-select-label">Katılımcı</InputLabel>
              <Select
                labelId="payment-type-select-label"
                id="payment-type-select"
                value={selectedPaymentType}
                label="Payment Type"
                onChange={handlePaymentTypeChange}
              >
                {paymentTypes.map(paymentType => (
                  <MenuItem key={paymentType.paymentTypeId} value={paymentType.paymentTypeId}>
                    {paymentType.paymentTypeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="course-name-select-label">Kurs Adı</InputLabel>
              <Select
                labelId="course-name-select-label"
                id="course-name-select"
                value={selectedCourseId}
                label="Course Name"
                onChange={handleCourseNameChange}
              >
                
                {Array.from(uniqueCourseNames).map((courseName, index) => {
                  const courseId = coursesList.find(course => course.courseName === courseName)?.courseId;
                  return (
                    <MenuItem key={index} value={courseId}>
                      {courseName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="course-long-select-label">Kurs Süresi</InputLabel>
              <Select
                labelId="course-long-select-label"
                id="course-long-select"
                value={selectedCourseLong}
                label="Course Long"
                onChange={handleCourseLongChange}
              >
                {uniqueCourseLongs.map(courseLong => (
                  <MenuItem key={courseLong} value={courseLong}>
                    {courseLong}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {isAllSelectionsMade ? (
              filteredPrices.length > 0 ? (
                filteredPrices.map(data => (
                  <p key={data.coursePriceId}>Ücret: {data.price} TL</p>
                ))
              ) : (
                <p>Fiyat bilgisi bulunmamaktadır</p>
              )
            ) : null}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
