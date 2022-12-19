import { Box } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { getUserInfo } from 'redux/features/auth/authSlice';
import colorConfigs from '../../configs/colorConfigs';
import { toggleBar } from '../../redux/features/appStateSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Sidebar from '../common/Sidebar';

const MainLayout = () => {
  const { hideBar } = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch<AppDispatch>();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();

  useEffect(() => {
    dispatch(getUserInfo(axiosPrivate));
  }, [axiosPrivate, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar toggle={() => dispatch(toggleBar())} showBar={!hideBar} />
      <Box
        sx={{
          flexGrow: 1,
          py: 3,
          px: 4,
          height: '100vh',
          backgroundColor: colorConfigs.mainBg,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
