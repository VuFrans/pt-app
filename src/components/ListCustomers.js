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
      />
    </div>
  );
}
