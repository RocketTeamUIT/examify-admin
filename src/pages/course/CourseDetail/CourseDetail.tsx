import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState } from 'react';
import Form from './Form';
import ChapterList from './ChapterList';

const CourseDetail = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết khoá học"
        breadcrumbs={[
          {
            name: 'Khoá học',
            path: '/course/list',
          },
          {
            name: 'Anh văn siêu cấp 1',
          },
        ]}
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

      {currentTab === 1 ? <Form /> : <ChapterList />}
    </Box>
  );
};

export default CourseDetail;
