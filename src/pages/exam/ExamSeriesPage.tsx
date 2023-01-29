import { IconButton, Box, Typography, Modal, SxProps } from '@mui/material';
import Topbar from '../../components/common/Topbar';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from '../../components/common/CustomToolbar';
import PrimaryButton from '../../components/common/PrimaryButton';
import EditIcon from '@mui/icons-material/Edit';
import { default as sx } from 'utils/tableProps';
import { useState } from 'react';
import { IExamSeries, initialExamSeries } from 'api/exam/examInterface';
import FormExamSeries from './FormExamSeries';

const columns: GridColDef[] = [
  {
    field: 'action',
    headerName: '',
    width: 60,
    sortable: false,
    disableColumnMenu: true,
  },
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 300,
    renderCell: (params) => <Typography fontWeight="bold">{params.value}</Typography>,
  },
  {
    field: 'totalExam',
    headerName: 'Số đề thi',
    flex: 1,
    minWidth: 100,
  },
  {
    field: 'publicDate',
    headerName: 'Ngày công khai',
    minWidth: 150,
  },
  {
    field: 'author',
    headerName: 'Tác giả',
    minWidth: 150,
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    minWidth: 200,
    renderCell: (params) => params.value?.slice(0, 19).split('T').join(' '),
  },
  {
    field: 'updatedAt',
    headerName: 'Ngày cập nhật',
    minWidth: 200,
    renderCell: (params) => params.value?.slice(0, 19).split('T').join(' '),
  },
];

const style: SxProps = {
  position: 'absolute',
  zIndex: '10',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const ExamSeriesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<IExamSeries>(initialExamSeries);
  // const { types: rows, addType, fetchData, deleteType } = useFetchFlashcardType();

  const rows = [
    { ...initialExamSeries, id: 1, name: 'abc', author: 'tf' },
    { ...initialExamSeries, id: 2, name: 'def', author: 'xz' },
  ];

  function handleDelete() {}

  function fetchData() {}

  columns[0].renderCell = (params) => (
    <IconButton onClick={() => toggleEdit(params.row.id)}>
      <EditIcon />
    </IconButton>
  );

  function toggle() {
    setOpen((prev) => !prev);
  }

  function toggleEdit(id: number) {
    setOpenEdit((prev) => !prev);
    if (!id) {
      setSelected(initialExamSeries);
    } else {
      setSelected(rows.find((row) => row.id === id) ?? initialExamSeries);
    }
  }

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Topbar
        title="Danh sách bộ đề"
        buttons={[
          <PrimaryButton onClick={toggle} variant="contained">
            Tạo mới
          </PrimaryButton>,
        ]}
      />

      <Box flex="1" mt="12px">
        <DataGrid
          rowsPerPageOptions={[5, 10, 20, 50]}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'asc' }],
            },
            pagination: {
              pageSize: 10,
            },
          }}
          components={{ Toolbar: CustomToolbar }}
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          sx={sx}
        />
      </Box>

      <Modal open={open} onClose={toggle}>
        <Box sx={style}>
          <FormExamSeries hide={toggle} isCreate />
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={toggleEdit}>
        <Box sx={style}>
          <FormExamSeries
            hide={toggleEdit}
            onDelete={handleDelete}
            onUpdate={fetchData}
            initialData={selected}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ExamSeriesPage;
