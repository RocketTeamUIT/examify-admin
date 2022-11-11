import { Box, Drawer, List, Toolbar } from '@mui/material';
import { Stack } from '@mui/system';
import assets from '../../assets';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';
import appRoutes from '../../routes/appRoutes';
import SidebarItem from './SidebarItem';
import SidebarItemCollapse from './SidebarItemCollapse';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sizeConfigs.sidebar.width,
          boxSizing: 'border-box',
          borderRight: '0px',
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: '20px' }}>
          <Stack sx={{ width: '100%', marginTop: '20px' }} direction="row" justifyContent="left">
            <img style={{ width: '120px', height: 'auto' }} src={assets.images.logo} alt="s" />
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
