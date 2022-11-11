import DashboardPageLayout from '../pages/dashboard/DashboardPageLayout';
import HomePage from '../pages/home/HomePage';
import { RouteType } from './config';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DefaultPage from '../pages/dashboard/DefaultPage';
import DashboardIndex from '../pages/dashboard/DashboardIndex';
import ChangelogPage from '../pages/changelog/ChangelogPage';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import AnalyticsPage from '../pages/dashboard/AnalyticsPage';
import SassPage from '../pages/dashboard/SassPage';

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
        state: 'dashboard.index',
      },
      {
        path: '/dashboard/default',
        element: <DefaultPage />,
        state: 'dashboard.default',
        sidebarProps: {
          displayText: 'Default',
        },
      },
      {
        path: '/dashboard/analytics',
        element: <AnalyticsPage />,
        state: 'dashboard.analytics',
        sidebarProps: {
          displayText: 'AnalyticsPage',
        },
      },
      {
        path: '/dashboard/sass',
        element: <SassPage />,
        state: 'dashboard.sass',
        sidebarProps: {
          displayText: 'SassPage',
        },
      },
    ],
  },
  {
    path: '/changelog',
    element: <ChangelogPage />,
    state: 'changelog',
    sidebarProps: {
      displayText: 'Changelog',
      icon: <FormatListBulletedOutlinedIcon />,
    },
  },
];

export default appRoutes;
