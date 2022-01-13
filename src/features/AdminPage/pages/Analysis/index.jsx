import { Box, Grid, Paper, Typography } from '@mui/material';
import adminApi from 'api/adminApi';
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import useStyles from './../../styles';

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const dynamicColors = () => {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};

function Analysis(props) {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [creator, setCreator] = useState([]);

  const courseName = courses.map((x) => x.course_name);
  const courseView = courses.map((x) => parseInt(x.viewed));
  const courseFavourited = courses.map((x) => parseInt(x.favourited));
  const courseLessons = courses.reduce(
    (accumulate, currentItem) =>
      accumulate + parseInt(currentItem.total_lesson),
    0
  );

  const creatorName = creator.map((x) => x.username);
  const creatorCourse = creator.map((x) => parseInt(x.total_course));
  const creatorColor = creator.map((x) => dynamicColors());

  useEffect(() => {
    (async () => {
      const { dataObj: courseAnalysis } = await adminApi.courseAnalysis();
      const { dataObj: creatorAnalysis } = await adminApi.creatorAnalysis();

      setCourses(courseAnalysis);
      setCreator(creatorAnalysis);
    })();
  }, []);

  const courseLineChartData = {
    labels: courseName,
    datasets: [
      {
        label: '# of Viewed',
        data: courseView,
        fill: false,
        borderColor: 'rgb(75, 192, 100)',
        tension: 0.1,
      },
      {
        label: '# of Favourited',
        data: courseFavourited,
        fill: false,
        borderColor: 'rgb(65, 112, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const creatorPieChart = {
    labels: creatorName,
    datasets: [
      {
        label: '# of Course',
        data: creatorCourse,
        backgroundColor: creatorColor,
        borderColor: creatorColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    // <div>
    //   <pre>{JSON.stringify(courses, null, 4)}</pre>
    //   <br />
    //   creator
    //   <pre>{JSON.stringify(creator, null, 4)}</pre>
    //   <Line data={courseLineChartData} options={chartOptions} />
    //   <Pie data={creatorPieChart} />
    // </div>
    <Paper elevation={2} className={classes.gridWrap}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Box className={classes.line}>
            <Line data={courseLineChartData} options={chartOptions} />
          </Box>

          <Box textAlign="center">
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              Thống kê lượt tương tác với bài học
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Paper elevation={1}>
            <Box className={classes.totalBox}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Tổng số
              </Typography>
              <Typography component="p" variant="h6">
                {courseLessons} bài học
              </Typography>
              <Typography color="textSecondary">
                vào thời điểm {moment(new Date()).format('DD - MM - YYYY')}
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={1}>
            <Pie data={creatorPieChart} />
          </Paper>
        </Grid>
      </Grid>

      <Box></Box>
    </Paper>
  );
}

export default Analysis;
