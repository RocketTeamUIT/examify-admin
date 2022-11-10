import DashboardPageLayout from '../pages/dashboard/DashboardPageLayout';
import HomePage from '../pages/home/HomePage';
import { RouteType } from './config';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DefaultPage from '../pages/dashboard/DefaultPage';
import DashboardIndex from '../pages/dashboard/DashboardIndex';

const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: 'home',
  },
  {
    path: '/dashboard',
    element: <DashboardPageLayout />,
    state: 'dashboard',
    sidebarProps: {
      displayText: 'Dashboard',
      icon: <DashboardOutlinedIcon />,
    },
    child: [
      {
        index: true,
        element: <DashboardIndex />,
        state: 'dashboard.default',
      },
      {
        path: '/dashboard/default',
        element: <DefaultPage />,
        state: 'dashboard.index',
        sidebarProps: {
          displayText: 'Default',
        },
      },
    ],
  },
];

export default appRoutes;
