import { Box } from '@mui/material';
import Topbar from '../../../components/common/Topbar';
import LessonForm from './LessonForm';

const LessonDetail = ({ type }: { type?: string }) => {
  return (
    <Box pb="20px">
      <Topbar
        title={type === 'create' ? 'Tạo bài học' : 'Chi tiết bài học'}
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
            path: '/course/1/chapter/2',
          },
          {
            name: 'Human Instrumentality',
            path: '/course/1/chapter/2/unit/3',
          },
          {
            name: 'Tạo bài học',
          },
        ]}
      />

      <Box mt="24px">
        <LessonForm />
      </Box>
    </Box>
  );
};

export default LessonDetail;
