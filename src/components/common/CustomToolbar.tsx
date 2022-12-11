import React from 'react';
import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter
        sx={{
          p: '10px 12px',
        }}
      />
      <GridToolbarFilterButton
        sx={{
          p: '10px 12px',
          m: '4px 2px 6px',
        }}
      />
      <GridToolbarExport
        sx={{
          p: '10px 12px',
          m: '4px 2px 6px',
        }}
      />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
