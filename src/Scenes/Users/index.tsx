import React from 'react';
import './style.css';
import Dashboard from 'Components/DashboardLayout';
import { RouteComponentProps } from 'react-router-dom';
import RenovationPage from './Components/Renovation';
import AddNewPropertyForm from './Components/AddTenant';
import AddTenant from './Components/AddTenant';
import AddUser from './Components/AddUser';
import Lease from './Components/Lease';
import USERS from './Components/Users';
import TENANTS from './Components/Tenants';
import CARETAKER from './Components/Users/caretakers';

class UsersPage extends React.Component<RouteComponentProps<{ action: string }>, {}> {
  newPropertyAction: {
    sell: JSX.Element;
    rent: JSX.Element;
    lease: JSX.Element;
    role: JSX.Element;
    care: JSX.Element;
    tenant: JSX.Element;
    renovation: JSX.Element;
    default: JSX.Element;
  };
  constructor() {
    super();
    this.newPropertyAction = {
      sell: <AddTenant />,
      rent: <AddUser />,
      lease: <Lease />,
      care: <CARETAKER />,
      role: <USERS />,
      tenant: <TENANTS />,
      renovation: <RenovationPage />,
      default: <AddNewPropertyForm />
    };
  }
  matchAction = () => {
    const section = this.props.match.params.action;
    switch (section) {
      case 'users':
        return this.newPropertyAction.rent;
      case 'tenants':
        return this.newPropertyAction.sell;
        case 'care':
          return this.newPropertyAction.care;
      case 'lease':
        return this.newPropertyAction.lease;
      case 'tenant':
        return this.newPropertyAction.tenant;
      case 'role':
        return this.newPropertyAction.role;
      case 'renovation':
        return this.newPropertyAction.renovation;
      default:
        return this.newPropertyAction.default;
    }
  } 
  render() {
    return (
      <div className="infoPage">
        <Dashboard >
          <div className="infoWrapper">
            {this.matchAction()}
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default UsersPage;