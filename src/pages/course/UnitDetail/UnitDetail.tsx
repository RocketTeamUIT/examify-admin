import { Box, Tab, Tabs } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import { useState } from 'react';
import TinyForm from '../TinyForm';
import LessonList from './LessonList';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { colors } from 'theme';

const UnitDetail = () => {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { courseId, chapterId, unitId } = useParams();
  const { course } = useSelector((store: RootState) => store.course);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  if (!course) return null;
  const chapter = (course.chapterList || []).find(
    (chapter: any) => String(chapter.id) === String(chapterId)
  );
  if (!chapter) return null;

  const unit = (chapter.unitList || []).find((unit: any) => String(unit.id) === String(unitId));
  if (!unit) return null;

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết chủ đề"
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
            path: `/course/${courseId}/chapter/${chapterId}`,
          },
          {
            name: unit.name,
          },
        ]}
        ribbonColor={colors.red[500]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách các bài học" />
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
          <TinyForm data={unit} handleFormSubmit={() => {}} />
        </Box>
      ) : (
        <LessonList lessonList={unit.lessonList} />
      )}
    </Box>
  );
};

export default UnitDetail;
