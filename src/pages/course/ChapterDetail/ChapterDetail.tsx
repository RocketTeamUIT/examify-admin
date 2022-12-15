import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState } from 'react';
import TinyForm from '../TinyForm';
import UnitList from './UnitList';
import { useParams } from 'react-router-dom';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { colors } from 'theme';

const ChapterDetail = () => {
  const { courseId, chapterId } = useParams();
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { course } = useSelector((store: RootState) => store.course);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!course) return null;

  const chapter = (course.chapterList || []).find(
    (chapter: any) => String(chapter.id) === String(chapterId)
  );

  if (!chapter) return null;

  const unitList = chapter.unitList;

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
            name: course.name,
            path: '/course/' + courseId,
          },
          {
            name: chapter.name,
          },
        ]}
        ribbonColor={colors.orange[400]}
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
          <TinyForm data={chapter} handleFormSubmit={() => {}} />
        </Box>
      ) : (
        <UnitList unitList={unitList} />
      )}
    </Box>
  );
};

export default ChapterDetail;
