import React, { useState, useEffect, forwardRef } from 'react';
import './styles/App.css';
import {
  ListCustomers,
  ListTrainings,
  Appbar,
  Calendar,
  AddBox,
  ArrowDownward,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FirstPage,
  LastPage,
  Search,
  Check,
} from './components/index';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
};

export default function App() {
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);

  let basePath = process.env.NODE_ENV === 'development' ? '' : '/pt-app';

  const baseUrl = 'https://customerrest.herokuapp.com';

  useEffect(() => {
    fetchCustomer();
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(`${baseUrl}/gettrainings`)
      .then((res) => res.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const fetchCustomer = async () => {
    await fetch(`${baseUrl}/api/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Appbar />
        <Switch>
          <Route
            path={`${basePath}/(|Customers)`}
            render={() => (
              <ListCustomers
                fetchCustomer={fetchCustomer}
                customers={customers}
                tableIcons={tableIcons}
              />
            )}
          />
          <Route
            path={`${basePath}/Trainings`}
            render={() => (
              <ListTrainings
                tableIcons={tableIcons}
                customers={customers}
                trainings={trainings}
                fetchTrainings={fetchTrainings}
              />
            )}
          />
          <Route
            path={`${basePath}/Calendar`}
            render={() => <Calendar trainings={trainings} />}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
