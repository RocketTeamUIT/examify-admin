import { IconButton, Box, SxProps, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from 'theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from 'components/common/CustomToolbar';
import EditIcon from '@mui/icons-material/Edit';
import PrimaryButton from 'components/common/PrimaryButton';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import TinyForm from '../TinyForm';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const columns: GridColDef[] = [
  {
    field: 'action',
    headerName: '',
    sortable: false,
    disableColumnMenu: true,
    width: 140,
    renderCell: (params) => (
      <>
        <Tooltip title="Chỉnh sửa">
          <Link to={`chapter/${params.row.id}`}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>
        </Tooltip>
        <Tooltip title="Tăng thứ tự">
          <IconButton>
            <ArrowUpwardIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Giảm thứ tự">
          <IconButton>
            <ArrowDownwardIcon />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
  { field: 'numericOrder', headerName: 'Thứ tự' },
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

const ChapterList = ({ chapterList: rows }: any) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  if (!rows) return null;

  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <TinyForm handleFormSubmit={() => {}} title="Thêm chương" />
        </Box>
      </Modal>

      <Box display="flex" justifyContent="right">
        <PrimaryButton variant="contained" onClick={handleOpen}>
          Tạo mới
        </PrimaryButton>
      </Box>

      <Box flex="1" mt="12px">
        <DataGrid
          rowsPerPageOptions={[5, 10, 20, 50]}
          initialState={{
            sorting: {
              sortModel: [{ field: 'numericOrder', sort: 'asc' }],
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
    </Box>
  );
};

export default ChapterList;
