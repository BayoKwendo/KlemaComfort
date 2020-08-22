import * as React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import Dashboard from 'Components/DashboardLayout';
import Invoice from './Components/Account';

class InvoicePage extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <div className="searchPage">
        <Dashboard>
          <div className="searchFormWrapper">
            <Invoice/>
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default InvoicePage;