import { IconButton, Box, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from 'theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from 'components/common/CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';
import PrimaryButton from 'components/common/PrimaryButton';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TinyForm from '../TinyForm';

type Props = {};

const columns: GridColDef[] = [
  {
    field: 'action',
    headerName: '',
    sortable: false,
    disableColumnMenu: true,
    width: 60,
    renderCell: (params) => (
      <Link to={`unit/${params.row.id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
    ),
  },
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 300,
  },
  {
    field: 'totalLesson',
    headerName: 'Số bài',
  },
];

const rows = [
  {
    id: 1,
    name: 'Nhập môn Anh văn Siêu cấp 2',
    totalLesson: 43,
  },
  {
    id: 2,
    name: 'Nhập môn Anh văn Siêu cấp 2',
    totalLesson: 43,
  },
];

const sx: SxProps = {
  '& .MuiDataGrid-columnHeader:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-root': {
    border: 'none',
  },
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: '600',
    color: '#000',
  },
  '& .MuiDataGrid-columnHeaders': {
    pl: '8px',
    backgroundColor: colors.grey[500],
    borderBottom: 'none',
  },
  '& .MuiDataGrid-footerContainer': {
    justifyContent: 'end',
    borderTop: 'none',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none !important',
  },
  '& .MuiDataGrid-row': {
    pl: '8px',
  },
  '& .MuiDataGrid-selectedRowCount': {
    display: 'none',
  },
  '& .MuiTablePagination-selectLabel': {
    display: 'none !important',
  },
  '& .MuiTablePagination-spacer': {
    display: 'none',
  },
  '& .MuiTablePagination-toolbar::before': {
    content: '"Số hàng mỗi trang"',
    display: 'block',
    marginRight: '-60px',
    width: '200px',
  },
};

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

const UnitList = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TinyForm handleFormSubmit={() => {}} title="Thêm chủ đề" />
        </Box>
      </Modal>

      <Box display="flex" justifyContent="right">
        <PrimaryButton variant="contained" onClick={handleOpen}>
          Thêm
        </PrimaryButton>
      </Box>

      <Box flex="1" mt="12px">
        <DataGrid
          rowsPerPageOptions={[5, 10, 20, 50]}
          initialState={{
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
    </Box>
  );
};

export default UnitList;
