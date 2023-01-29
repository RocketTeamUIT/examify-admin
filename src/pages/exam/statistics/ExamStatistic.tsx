import { Box, Grid } from '@mui/material';
import { createNewCourseService } from 'api/course/course';
import { INewCourse } from 'api/course/courseInterface';
import Topbar from 'components/common/Topbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RootState } from 'redux/store';
import CompletingCard from './CompletingCard';
import JoiningCard from './JoiningCard';
import LineChart from './LineChart';
import PopularCard from './PopularCard';
import RatingCard from './RatingCard';
import StarCard from './StarCard';

// import PopularCard from './PopularCard';
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';

const gridSpacing = 3;

const ExamStatistic = () => {
  const { user } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  return (
    <Box pb="20px">
      <Topbar title="Thống kê đề thi" />
      <div style={{ marginTop: '20px' }}></div>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <JoiningCard />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CompletingCard />
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <StarCard />
                </Grid>
                <Grid item sm={6} xs={12} md={6} lg={12}>
                  <RatingCard />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={8}>
              <LineChart />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExamStatistic;
