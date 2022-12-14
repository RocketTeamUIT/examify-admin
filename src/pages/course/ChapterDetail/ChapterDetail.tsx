import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState } from 'react';
import TinyForm from '../TinyForm';
import UnitList from './UnitList';

const ChapterDetail = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết chương"
        breadcrumbs={[
          {
            name: 'Khoá học',
            path: '/course',
          },
          {
            name: 'Anh văn siêu cấp 1',
            path: '/course/1',
          },
          {
            name: 'Thức thứ chín - Luyện ngục',
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
        <Tab value={2} label="Danh sách các chủ đề" />
      </Tabs>

      {currentTab === 1 ? (
        <Box
          maxWidth="600px"
          position="relative"
          left="50%"
          sx={{
            transform: 'translateX(-50%)',
          }}
        >
          <TinyForm handleFormSubmit={() => {}} />
        </Box>
      ) : (
        <UnitList />
      )}
    </Box>
  );
};

export default ChapterDetail;
