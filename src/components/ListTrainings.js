import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';

export default function ListTrainings(props) {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(`https://customerrest.herokuapp.com/gettrainings`)
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  };

  const columns = [
    { title: 'Activity', field: 'activity' },
    {
      title: 'Date',
      field: 'date',
      type: 'date'
    },
    { title: 'Duration', field: 'duration' },
    {
      title: 'First name',
      field: 'customer.firstname'
    },
    {
      title: 'Last name',
      field: 'customer.lastname'
    }
  ];

  return (
    <div style={{ margin: '50px' }}>
      <MaterialTable
        icons={props.tableIcons}
        title="Trainings"
        columns={columns}
        data={trainings}
        actions={[
          {
            icon: props.tableIcons.Delete,
            tooltip: 'Delete Training',
            onClick: (event, rowData) => {
              if (window.confirm('Are you sure ?')) {
                fetch(
                  `https://customerrest.herokuapp.com/api/trainings/${rowData.id}`,
                  { method: 'DELETE' }
                )
                  .then(res => fetchTrainings())
                  .catch(err => console.error(err));
              }
            }
          }
        ]}
        options={{
          actionsCellStyle: { padding: '20px' }
        }}
      />
    </div>
  );
}
