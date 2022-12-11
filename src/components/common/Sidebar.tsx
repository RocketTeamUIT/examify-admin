import { Drawer, List, Toolbar, IconButton } from '@mui/material';
import { Stack } from '@mui/system';
import assets from '../../assets';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';
import appRoutes from '../../routes/appRoutes';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type SidebarProps = {
  toggle: React.MouseEventHandler<HTMLElement>;
  showBar: boolean;
};

const Sidebar = ({ toggle, showBar }: SidebarProps) => {
  return (
    <Drawer
      open={showBar}
      variant="persistent"
      sx={{
        width: showBar ? sizeConfigs.sidebar.width : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sizeConfigs.sidebar.width,
          boxSizing: 'border-box',
          borderRight: '0px',
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
          overflow: 'visible',
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ margin: '8px 0 20px' }}>
          <Stack
            sx={{ width: '100%', marginTop: '20px' }}
            direction="row"
            justifyContent="space-between"
          >
            <img style={{ width: '120px', height: 'auto' }} src={assets.images.logo} alt="s" />
            <IconButton
              aria-label="close"
              size="medium"
              onClick={toggle}
              sx={{
                position: 'absolute',
                right: '-15px',
                mr: '-5px',
                bgcolor: 'white',
                zIndex: 10,
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.25) !important',
                '&:hover': {
                  backgroundColor: '#ccc',
                },
              }}
            >
              <ChevronLeftIcon
                sx={{
                  color: 'black',
                }}
              />
            </IconButton>
          </Stack>
        </Toolbar>
        {appRoutes.map((route, index) => {
          return route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null;
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
