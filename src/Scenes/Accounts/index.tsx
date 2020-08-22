import * as React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import Dashboard from 'Components/DashboardLayout';
import Account from './Components/Account/index';

class AccountPage extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <div className="searchPage">
        <Dashboard>
        
          <div className="searchFormWrapper">
            <Account/>
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default AccountPage;