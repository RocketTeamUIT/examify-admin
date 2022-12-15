import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState } from 'react';
import CourseForm from './CourseForm';
import ChapterList from './ChapterList';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { colors } from 'theme';

const CourseDetail = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { course } = useSelector((store: RootState) => store.course);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!course) return null;

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết khoá học"
        breadcrumbs={[
          {
            name: 'Khoá học',
            path: '/course',
          },
          {
            name: course.name,
          },
        ]}
        ribbonColor={colors.primary[400]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách các chương" />
      </Tabs>

      {currentTab === 1 ? (
        <CourseForm course={course} />
      ) : (
        <ChapterList chapterList={course.chapterList} />
      )}
    </Box>
  );
};

export default CourseDetail;
