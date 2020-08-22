import * as React from 'react';
import './style.css';
import AddHouse from '../AddHouse';

class RentPropertyPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Add House</h3>
          <h5>Fill the below fields to add House</h5>
        </div>
        <div className="dashboardBody">
          <AddHouse />
        </div>
      </div>
    );
  }
}

export default RentPropertyPage;