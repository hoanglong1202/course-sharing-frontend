import { Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import CourseCard from 'features/MainPage/components/CourseCard';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import useStyles from '../../styles';

SearchPage.propTypes = {};

function SearchPage(props) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState([]);
  const [orderBy, setOrderBy] = useState('DESC');
  const [courseTypes, setCourseTypes] = useState('all');
  const [courseTypesList, setCourseTypesList] = useState('');

  const location = useLocation();
  const classes = useStyles();
  let [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return params;
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { dataObj } = await courseApi.searchCourse(queryParams);

        setCourse(dataObj);
        setLoading(false);
      } catch (error) {
        console.log('Some error occur: ', error);
      }
    })();
  }, [queryParams]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { dataObj } = await courseApi.getCourseTypes();

        setCourseTypesList(dataObj);
        setLoading(false);
      } catch (error) {
        console.log('Some error occur: ', error);
      }
    })();
  }, []);

  const handleOrderByChange = (event) => {
    const {
      target: { value },
    } = event;

    const query = {
      ...queryParams,
      orderBy: value,
    };

    setOrderBy(value);
    setSearchParams(query);
  };

  const handleCourseTypeChange = (event) => {
    const {
      target: { value },
    } = event;
    let query = {};

    if (value !== 'all') {
      query = {
        ...queryParams,
        courseType: value,
      };
    } else {
      const { courseType, ...rest } = queryParams;
      query = {
        ...rest,
      };
    }

    setCourseTypes(value);
    setSearchParams(query);
  };

  return (
    <Box>
      This is search Page is: {queryParams.courseName}
      {!loading && (
        <>
          <Box mt={3} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Sắp xếp</InputLabel>
              <Select
                value={orderBy}
                label="Sắp xếp"
                onChange={handleOrderByChange}
              >
                <MenuItem value="DESC">Mới nhất</MenuItem>
                <MenuItem value="ASC">Lâu Nhất</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={3} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel>Danh mục</InputLabel>
              <Select
                value={courseTypes}
                label="Danh mục"
                onChange={handleCourseTypeChange}
              >
                <MenuItem value="all">All</MenuItem>
                {courseTypesList.length > 0 &&
                  courseTypesList?.map((item, index) => (
                    <MenuItem value={item.name}>{item.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>{' '}
        </>
      )}
      <Box mt={3}>
        <Grid container spacing={3} className={classes.courseContainer}>
          {!loading && course.length > 0 ? (
            course.map((item) => (
              <Grid item key={item.id}>
                <CourseCard item={item} />
              </Grid>
            ))
          ) : (
            <p>Course Not Found</p>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default SearchPage;
