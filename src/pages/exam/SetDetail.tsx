import { Box, Tab, Tabs } from '@mui/material';
import { initialSet, ISet } from 'api/exam/examInterface';
import Topbar from 'components/common/Topbar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getExamDetail } from 'redux/features/exam/examSlice';
import { AppDispatch, RootState } from 'redux/store';
import { colors } from 'theme';
import FormSet from './FormSet';
import QuestionList from './QuestionList';
import SetList from './SetList';
import { findPart } from './utils/findExam';

function SetDetail() {
  const [currentTab, setCurrentTab] = useState<number>(1);
  const { examId, partId } = useParams();
  const { detail } = useSelector((store: RootState) => store.exam);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function fetchData() {
    if (examId) {
      dispatch(getExamDetail(Number(examId)));
    }
  }

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  function handleDelete() {
    navigate('/exam/list');
  }

  const updateData: ISet = {
    ...initialSet,
    ...detail,
  };

  return (
    <Box pb="20px">
      <Topbar
        title="Chi tiết bộ câu hỏi"
        breadcrumbs={[
          {
            name: 'Đề thi',
            path: '/exam/list',
          },
          {
            name: detail?.name || '',
            path: `/exam/list/${detail.id}`,
          },
          {
            name: findPart(detail, partId)?.name || '',
            path: `/exam/list/${detail.id}/part/${partId}`,
          },
          {
            // REPLACE LINE BELOW
            name: 'Set super',
          },
        ]}
        ribbonColor={colors.red[400]}
      />

      <Tabs
        value={currentTab}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
        sx={{ mb: '20px' }}
        centered
      >
        <Tab value={1} label="Thông tin" />
        <Tab value={2} label="Danh sách câu hỏi" />
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
          <FormSet hide={() => {}} />
        </Box>
      ) : (
        <Box sx={{ mt: '24px' }}>
          <QuestionList />
        </Box>
      )}
    </Box>
  );
}

export default SetDetail;
