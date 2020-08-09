import  React from 'react';
import './style.css';
import Dashboard from 'Components/DashboardLayout';
import { RouteComponentProps } from 'react-router-dom';
import RenovationPage from './Components/Renovation';
import AddNewPropertyForm from './Components/AddTenant';
import AddTenant from './Components/AddTenant';
import AddUser from './Components/AddUser';

class UsersPage extends React.Component<RouteComponentProps<{action: string}>, {}> {
  newPropertyAction: {
    sell: JSX.Element;
    rent: JSX.Element;
    renovation: JSX.Element;
    default: JSX.Element;
  };
  constructor() {
    super();
    this.newPropertyAction = {
      sell: <AddTenant />,
      rent: <AddUser />,
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