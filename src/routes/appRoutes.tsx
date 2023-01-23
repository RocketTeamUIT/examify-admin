import DashboardPageLayout from '../pages/dashboard/DashboardPageLayout';
import HomePage from '../pages/home/HomePage';
import { RouteType } from './config';
import DefaultPage from '../pages/dashboard/DefaultPage';
import DashboardIndex from '../pages/dashboard/DashboardIndex';
import AnalyticsPage from '../pages/dashboard/AnalyticsPage';
import SassPage from '../pages/dashboard/SassPage';
import { BiHomeAlt, BiLayout, BiDetail } from 'react-icons/bi';
import { AiFillCreditCard } from 'react-icons/ai';
import CourseListPage from '../pages/course/CourseListPage';
import CoursePageLayout from '../pages/course/CoursePageLayout';
import ExamPageLayout from '../pages/exam/ExamPageLayout';
import ExamIndex from '../pages/exam/ExamIndex';
import ExamListPage from '../pages/exam/ExamListPage';
import ExamCreatePage from '../pages/exam/ExamCreatePage';
import CourseCreatePage from '../pages/course/CourseCreatePage';
import { Outlet } from 'react-router-dom';
import { FlashcardType } from 'pages/flashcard';

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
      icon: <BiHomeAlt size={24} />,
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
    path: '/',
    element: <CoursePageLayout />,
    state: 'course',
    sidebarProps: {
      displayText: 'Khóa học',
      icon: <BiLayout size={24} />,
    },
    child: [
      {
        index: true,
        path: '/course',
        element: <CourseListPage />,
        state: 'course.list',
        sidebarProps: {
          displayText: 'Danh sách khoá học',
        },
      },
      {
        path: '/course/create',
        element: <CourseCreatePage />,
        state: 'course.create',
        sidebarProps: {
          displayText: 'Tạo khoá học',
        },
      },
    ],
  },
  {
    path: '/exam',
    element: <ExamPageLayout />,
    state: 'exam',
    sidebarProps: {
      displayText: 'Đề thi',
      icon: <BiDetail size={24} />,
    },
    child: [
      {
        index: true,
        element: <ExamIndex />,
        state: 'exam.index',
      },
      {
        path: '/exam/list',
        element: <ExamListPage />,
        state: 'exam.list',
        sidebarProps: {
          displayText: 'Danh sách',
        },
      },
      {
        path: '/exam/create',
        element: <ExamCreatePage />,
        state: 'exam.create',
        sidebarProps: {
          displayText: 'Tạo',
        },
      },
    ],
  },
  {
    path: '/flashcard',
    element: <Outlet />,
    state: 'flashcard',
    sidebarProps: {
      displayText: 'Flashcard',
      icon: <AiFillCreditCard size={24} />,
    },
    child: [
      {
        index: true,
        path: '/flashcard/type',
        element: <FlashcardType />,
        state: 'flashcard.type',
        sidebarProps: {
          displayText: 'Loại flashcard',
        },
      },
      {
        path: '/flashcard/set',
        element: <CourseCreatePage />,
        state: 'flashcard.set',
        sidebarProps: {
          displayText: 'Bộ flashcard',
        },
      },
    ],
  },
];

export default appRoutes;
