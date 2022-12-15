import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { authenticationRoutes, routes } from './routes';
import './index.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import AuthLayout from 'components/layout/AuthLayout';
import CourseDetail from 'pages/course/CourseDetail/CourseDetail';
import ChapterDetail from 'pages/course/ChapterDetail/ChapterDetail';
import UnitDetail from 'pages/course/UnitDetail';
import LessonDetail from 'pages/course/LessonDetail/LessonDetail';

declare module '@mui/material/styles' {
  interface Theme {
    typography: {
      fontFamily: string;
    };
  }
  // allow configuration using `createTheme`
  interface TypographyOptions {
    typography?: {
      fontFamily?: string;
    };
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {routes}
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/course/:courseId/chapter/:chapterId" element={<ChapterDetail />} />
            <Route
              path="/course/:courseId/chapter/:chapterId/unit/:unitId"
              element={<UnitDetail />}
            />
            <Route
              path="/course/:courseId/chapter/:chapterId/unit/:unitId/lesson/:lessonId"
              element={<LessonDetail />}
            />
            <Route
              path="/course/:courseId/chapter/:chapterId/unit/:unitId/lesson/create"
              element={<LessonDetail type="create" />}
            />
          </Route>
          <Route element={<AuthLayout />}>{authenticationRoutes}</Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
