import * as React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import Dashboard from 'Components/DashboardLayout';
import LeaseP from './Components/Lease';

class LeasePage extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <div className="searchPage">
        <Dashboard>
        
          <div className="searchFormWrapper">
            <LeaseP/>
           
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default LeasePage;