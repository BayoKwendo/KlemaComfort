import * as React from 'react';
import './style.css';
import AddBilling from '../AddBilling';

class Billings extends React.Component<{}, {}> {
  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Add Billings</h3>
          <h5>Attach Billings to the house</h5>
        </div>
        <div className="dashboardBody">
          <AddBilling />
        </div>
      </div>
    );
  }
}

export default Billings ;