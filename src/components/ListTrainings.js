import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

export default function ListTrainings(props) {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(`https://customerrest.herokuapp.com/api/trainings`)
      .then(res => res.json())
      .then(data => setTrainings(data.content))
      .catch(err => console.error(err));
  };

  const columns = [
    { title: 'Activity', field: 'activity' },
    {
      title: 'Date',
      field: 'date',
      type: 'date'
    },
    { title: 'Duration', field: 'duration' }
  ];

  return (
    <div style={{ margin: '50px' }}>
      <MaterialTable
        icons={props.tableIcons}
        title="Trainings"
        columns={columns}
        data={trainings}
      />
    </div>
  );
}
