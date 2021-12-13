import { Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { Box } from '@mui/system';
import courseApi from 'api/courseApi';
import creatorApi from 'api/creatorApi';
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
  const [courseTypesList, setCourseTypesList] = useState([]);
  const [creatorName, setCreatorName] = useState('all');
  const [creatorNameList, setCreatorNameList] = useState([]);

  const location = useLocation();
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
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
        const { dataObj } = await courseApi.getCourseTypes();
        const { dataObj: nameList } = await creatorApi.getCreatorName();

        setCourseTypesList(dataObj);
        setCreatorNameList(nameList);
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

  const handleCreatorNameChange = (event) => {
    const {
      target: { value },
    } = event;
    let query = {};

    if (value !== 'all') {
      query = {
        ...queryParams,
        creatorName: value,
      };
    } else {
      const { creatorName, ...rest } = queryParams;
      query = {
        ...rest,
      };
    }

    setCreatorName(value);
    setSearchParams(query);
  };

  return (
    <Box>
      <Box className={classes.selectContainer}>
        <Box className={classes.selectHolder}>
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
        </Box>

        <Box className={classes.selectHolder}>
          <FormControl fullWidth>
            <InputLabel>Tác giả</InputLabel>
            <Select
              value={creatorName}
              label="Tác giả"
              onChange={handleCreatorNameChange}
            >
              <MenuItem value="all">All</MenuItem>
              {creatorNameList.length > 0 &&
                creatorNameList?.map((item, index) => (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>

        <Box className={classes.selectHolder}>
          <FormControl fullWidth>
            <InputLabel>Sắp xếp theo</InputLabel>
            <Select
              value={orderBy}
              label="Sắp xếp theo"
              onChange={handleOrderByChange}
            >
              <MenuItem value="DESC">Mới nhất</MenuItem>
              <MenuItem value="ASC">Lâu Nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
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
