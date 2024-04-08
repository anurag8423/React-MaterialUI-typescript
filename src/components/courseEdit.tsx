import React, { useState, useEffect, FormEvent } from 'react';
import { Form } from "react-router-dom";
import { Container, Typography, CssBaseline, Grid, TextField, Chip, Stack, Autocomplete, Button, Box } from '@mui/material';
import axios from 'axios';

interface Course {
  courseId: string;
  instructorName: string;
  courseName: string;
}

interface Student {
  name: string;
}

const MyComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [values, setValues] = useState<string[]>([]);
  const [selectedOption1, setSelectedOption1] = useState<Student | null>(null);
  const [values1, setValues1] = useState<Student[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [options1, setOptions1] = useState<Student[]>([]);
  const [data, setData] = useState<{ courses: Course[] }>({ courses: [] });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<string[]>('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json');
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await axios.get<Student[]>('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/students.json');
        setOptions1(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    const fetchCourseData = async () => {
      try {
        const response = await axios.get<{ courses: Course[] }>('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchTags();
    fetchStudents();
    fetchCourseData();
  }, []);

  const handleAddOption = () => {
    if (selectedOption && !values.includes(selectedOption)) {
      setValues([...values, selectedOption]);
      setSelectedOption(null);
    }
  };

  const handleDelete = (valueToDelete: string) => () => {
    setValues((prevValues) => prevValues.filter((value) => value !== valueToDelete));
  };

  const handleAddOption1 = () => {
    if (selectedOption1 && !values1.find(value => value.name === selectedOption1.name)) {
      setValues1([...values1, selectedOption1]);
      setSelectedOption1(null);
    }
  };

  const handleDelete1 = (valueToDelete: Student) => () => {
    setValues1((prevValues) => prevValues.filter((value) => value !== valueToDelete));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    const formData = new FormData(event.target as HTMLFormElement); 
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value; 
    });
    console.log('Form Data:', data); 
  }

  return (
    <>
      <CssBaseline />
      <Typography variant="h1" align="center" style={{ marginTop: "1em", marginBottom: "1em" }}>Course Editing Form</Typography>
      {data.courses.map((course, index) => {
        return (
          <Container key={index} maxWidth="md" style={{ borderRadius: "1em", borderStyle: "solid", borderWidth: "0.5em", borderColor: "black" }}>
            <Typography variant="h3" align="center" style={{ marginTop: "1em", marginBottom: "1em" }}>{course.courseName.toUpperCase()}</Typography>
            <Form method="post" action="/" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="courseID"
                    required
                    fullWidth
                    id="courseID"
                    label="Course ID"
                    defaultValue={course.courseId}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="instructorname"
                    required
                    fullWidth
                    defaultValue={course.instructorName}
                    id="instructorname"
                    label="Instructor Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="coursename"
                    required
                    fullWidth
                    defaultValue={course.courseName}
                    id="coursename"
                    label="Course Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {options && (
                    <>
                      <Autocomplete
                        options={options}
                        value={selectedOption}
                        onChange={(event, newValue) => {
                          setSelectedOption(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Course tags" />}
                      />
                      <button type="button" onClick={handleAddOption}>Add</button>
                      <br />
                      <br />
                      <Stack direction="row" spacing={1}>
                        {values.map((value, index) => (
                          <Chip
                            key={index}
                            label={value}
                            onDelete={handleDelete(value)}
                            color="primary"
                          />
                        ))}
                      </Stack>
                    </>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {options1 && (
                    <>
                      <Autocomplete
                        options={options1}
                        getOptionLabel={(option) => option.name}
                        value={selectedOption1}
                        onChange={(event, newValue) => {
                          setSelectedOption1(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Enrolled Students" />}
                      />
                      <button type="button" onClick={handleAddOption1}>Add</button>
                      <br />
                      <br />
                      <Stack direction="row" spacing={1}>
                        {values1.map((value, index) => (
                          <Chip
                            key={index}
                            label={value.name}
                            onDelete={handleDelete1(value)}
                            color="primary"
                          />
                        ))}
                      </Stack>
                    </>
                  )}
                </Grid>
              </Grid>
              <Box textAlign="center">
                <Button type="submit" variant="contained" color="primary">
                  submit
                </Button>
              </Box>
            </Form>
          </Container>
        )
      })}
    </>
  );
};

export default MyComponent;
