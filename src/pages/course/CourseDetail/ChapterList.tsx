import { IconButton, Box, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';
import Topbar from 'components/common/Topbar';
import { colors } from 'theme';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import CustomToolbar from 'components/common/CustomToolbar';
import PrimaryButton from 'components/common/PrimaryButton';
import { numberWithCommas } from 'utils/formatCurrency';
import EditIcon from '@mui/icons-material/Edit';

type Props = {};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
    minWidth: 300,
  },
  {
    field: 'level',
    headerName: 'Mức độ',
    minWidth: 100,
  },
  {
    field: 'pointToUnlock',
    headerName: 'Điểm mở khoá',
  },
  {
    field: 'price',
    headerName: 'Giá',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => {
      return numberWithCommas(params.value) + 'đ';
    },
  },
  {
    field: 'discount',
    headerName: 'Giảm giá',
    renderCell: (params) => params.value + '%',
  },
  {
    field: 'pointReward',
    headerName: 'Điểm thưởng',
  },
  {
    field: 'participants',
    headerName: 'Số tham gia',
  },
  {
    field: 'avgRating',
    headerName: 'Đánh giá',
  },
  {
    field: 'action',
    headerName: 'Thao tác',
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Link to={`/course/list/${params.row.id}`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
    ),
  },
];

const rows = [
  {
    id: 1,
    name: 'Nhập môn Anh văn Siêu cấp 1',
    level: 'Cơ bản',
    pointToUnlock: 1234,
    price: 1234656,
    discount: 24,
    pointReward: 1234,
    participants: 4000,
    avgRating: 4.3,
  },
  {
    id: 2,
    name: 'Nhập môn Anh văn Siêu cấp 2',
    level: 'Trung bình',
    pointToUnlock: 1234,
    price: 1234656,
    discount: 24,
    pointReward: 1234,
    participants: 4000,
    avgRating: 4.3,
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

const ChapterList = (props: Props) => {
  return (
    <Box display="flex" height="calc(100vh - 50px)" flexDirection="column">
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

export default ChapterList;
