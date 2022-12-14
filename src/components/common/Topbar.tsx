import { Breadcrumbs, Toolbar, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/system';
import { FC, ReactElement } from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBar } from '../../redux/features/appStateSlice';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  name: string;
  path?: string;
}

type TopbarProps = {
  title: string;
  buttons?: ReactElement[];
  breadcrumbs?: BreadcrumbProps[];
};

const Topbar: FC<TopbarProps> = ({ title, buttons, breadcrumbs }) => {
  const { hideBar } = useSelector((store: RootState) => store.appState);
  const dispatch = useDispatch();
  const showBar = () => {
    dispatch(toggleBar());
  };

  return (
    <Box bgcolor="#fff" m="-24px -32px 0 -32px" p="16px 8px 0" zIndex="10">
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          {hideBar && (
            <IconButton
              onClick={showBar}
              aria-label="close"
              size="medium"
              sx={{
                m: '0 12px 0 -4px',
                bgcolor: 'white',
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.25) !important',
                '&:hover': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              <ChevronRightIcon
                sx={{
                  color: 'black',
                }}
              />
            </IconButton>
          )}
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>

          <Box ml="auto">{buttons}</Box>
        </Box>
      </Toolbar>
      {breadcrumbs && (
        <Breadcrumbs
          sx={{
            ml: '24px',
          }}
        >
          {breadcrumbs.map((breadcrumb, index) => {
            if (breadcrumb.path)
              return (
                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  key={index}
                  to={breadcrumb.path}
                >
                  {breadcrumb.name}
                </Link>
              );
            return <Typography key={index}>{breadcrumb.name}</Typography>;
          })}
        </Breadcrumbs>
      )}
    </Box>
  );
};

export default Topbar;
