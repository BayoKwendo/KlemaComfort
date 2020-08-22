import * as React from 'react';
import './style.css';
import Dashboard from 'Components/DashboardLayout';
import Payment from './pay';

class AddPay extends React.Component<{}, {}> {
  render() {
    return (
      <div className="infoPage">
        <Dashboard >
          <div className="infoWrapper">
          <div className="rentPropertyPage">
            <div className="dashboardTitle">
              <h3>Make Payments</h3>
              <h5>Fill the fields below to payment</h5>
            </div>
            <div className="dashboardBody">
              <Payment/>
            </div>
          </div>
          </div>
        </Dashboard>
        </div>
    );
  }
}

export default AddPay;