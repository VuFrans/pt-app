import React from 'react';
import MaterialTable from 'material-table';

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
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                fetch('https://customerrest.herokuapp.com/api/customers', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newData)
                })
                  .then(res => props.fetchCustomer())
                  .catch(err => console.error(err));
              }, 600);
            }),
          onRowUpdate: rowData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                fetch(rowData.links[0].href, {
                  method: 'PUT',
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
      />
    </div>
  );
}
