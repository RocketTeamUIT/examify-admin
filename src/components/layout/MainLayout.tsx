import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import colorConfigs from '../../configs/colorConfigs';
import { toggleBar } from '../../redux/features/appStateSlice';
import { RootState } from '../../redux/store';
import Sidebar from '../common/Sidebar';

const MainLayout = () => {
  const { hideBar } = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();

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
