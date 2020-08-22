import * as React from 'react';
import './style.css';
import AddNewPropertyForm from '../AddNewPropertyForm';

class SellPropertyPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="sellPropertyPage">
        <div className="dashboardTitle">
          <h3>Add Apartments</h3>
          <h5>Fill the below fields to add an Apartment</h5>
        </div>
        <div className="dashboardBody">
          <AddNewPropertyForm />
        </div>
      </div>
    );
  }
}

export default SellPropertyPage;