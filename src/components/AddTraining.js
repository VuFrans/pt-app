import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';

export default function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: Date.now(),
    activity: '',
    duration: '',
    customer: props.customer
  });

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleInputChange = e => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  const addTraining = () => {
    props.addTraining(props.customer, training);
    handleClose();
    console.log(props.customer);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add Training for {props.firstname} {props.lastname}
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              format="dd.mm.yyyy"
              margin="dense"
              id="date-picker-dialog"
              label="Date"
              value={training.date}
              onChange={e => handleInputChange(moment(e).format('DD.MM.YYYY'))}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={e => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={e => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
