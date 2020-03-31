import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import PersonIcon from '@material-ui/icons/Person';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DateRangeIcon from '@material-ui/icons/DateRange';
import '../styles/Appbar.css';

export default function Appbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <div className="root">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">Personal trainer</Typography>
        </Toolbar>
      </AppBar>
      <Drawer className="drawer" variant="persistent" anchor="left" open={open}>
        <div className="drawer-header">
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Customers', 'Trainings', 'Calendar'].map((item, index) => (
            <Link className="Link" key={item} to={item}>
              <ListItem button>
                <ListItemIcon>
                  {index === 0 ? (
                    <PersonIcon />
                  ) : index === 1 ? (
                    <FitnessCenterIcon />
                  ) : (
                    <DateRangeIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
