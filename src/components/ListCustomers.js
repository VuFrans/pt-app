import React from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import AddTraining from './AddTraining';
import { render } from '@testing-library/react';

export default function ListCustomers(props) {
  const columns = [
    { title: 'First name', field: 'firstname' },
    { title: 'Last name', field: 'lastname' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
    { title: 'Address', field: 'streetaddress' },
    { title: 'Postcode', field: 'postcode' },
    { title: 'City', field: 'city' }
  ];

  const addTraining = (link, customer) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer)
    })
      .then(res => props.fetchCustomer())
      .catch(err => console.error(err));
  };

  return (
    <div style={{ margin: '50px' }}>
      <MaterialTable
        icons={props.tableIcons}
        title="Customers"
        columns={columns}
        data={props.customers}
        actions={[
          {
            icon: props.tableIcons.Delete,
            tooltip: 'Delete Customer',
            onClick: (event, rowData) => {
              if (window.confirm('Are you sure ?')) {
                fetch(rowData.links[0].href, { method: 'DELETE' })
                  .then(res => props.fetchCustomer())
                  .catch(err => console.error(err));
              }
            }
          },
          {
            icon: props.tableIcons.Edit
          },
          {
            icon: () => (
              <Button size="small" color="primary" label="TEST">
                ADD TRAINING
              </Button>
            ),
            onClick: (event, rowData) =>
              render(
                <AddTraining
                  customer={rowData.links[0].href}
                  addTraining={addTraining}
                  firstname={rowData.firstname}
                  lastname={rowData.lastname}
                />
              )
          }
        ]}
        editable={{
          onRowAdd: rowData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                fetch('https://customerrest.herokuapp.com/api/customers', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(rowData)
                })
                  .then(res => props.fetchCustomer())
                  .catch(err => console.error(err));
              }, 600);
            })
        }}
        options={{
          actionsCellStyle: { paddingRight: '50px' }
        }}
      />
    </div>
  );
}
