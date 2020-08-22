import * as React from 'react';
import './style.css';
import AddLease from '../AddLease';

class Lease extends React.Component<{}, {}> {
  render() {
    return (
    
          <div className="rentPropertyPage">
            <div className="dashboardTitle">
              <h3>Add Lease</h3>
              <h5>Fill the fields below to create Posts</h5>
            </div>
            <div className="dashboardBody">
              <AddLease />
            </div>
          </div>
       
    );
  }
}

export default Lease;