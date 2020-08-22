import * as React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import Dashboard from 'Components/DashboardLayout';
import Complains from './Components/Complains/index';
import AddComplaint from './Components/AddComplaint';

class ComplainPage extends React.Component<RouteComponentProps<{ action: string }>, {}> {
  newPropertyAction: {
    add: JSX.Element;
    complain: JSX.Element;
    default: JSX.Element;

  };
  constructor() {
    super();
    this.newPropertyAction = {
      add: <AddComplaint />,
      complain: <Complains />,
      default: <Complains />

    };
  }
  matchAction = () => {
    const section = this.props.match.params.action;
    switch (section) {
      case 'add':
        return this.newPropertyAction.add;
      case 'complain':
        return this.newPropertyAction.complain;
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


export default ComplainPage;