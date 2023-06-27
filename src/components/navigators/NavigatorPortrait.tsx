
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { RouteType } from './Navigator';

const NavigatorPortrait: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [value, setValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const [currentLabel, setCurrentLabel] = useState(routes[0].label);

  useEffect(() => {
    let index = routes.findIndex((r) => r.to === location.pathname); // active route
    if (index < 0) {
      index = 0;
    }
    navigate(routes[index].to);
    setValue(index);
  }, [routes, location.pathname]);


useEffect(() => {
    setCurrentLabel(routes[value]?.label || '');
  }, [routes, value]);


function getLinks(): ReactNode {
    return routes.map((r) => (
      <ListItemButton component={NavLink} to={r.to} key={r.label} onClick={() => setDrawerOpen(false)}>
        <ListItemText primary={r.label} />
      </ListItemButton>
    ));
  }

    return (
    <Box>
      <AppBar sx={{ backgroundColor: 'lightgray' }}> 
        <Toolbar>
          <IconButton edge="start" color="success" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography color="#388e3c" variant="h6" component="div" sx={{ ml: 1 }}>
          {currentLabel}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>{getLinks()}</List>
      </Drawer>

      <Toolbar/>
      <Outlet/>
    </Box>
  );
};



export default NavigatorPortrait;