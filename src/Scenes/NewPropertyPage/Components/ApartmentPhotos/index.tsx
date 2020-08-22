import * as React from 'react';
import './style.css';
import AddPhoto from '../AddPhoto';

class ApartmentPhotos extends React.Component<{}, {}> {
  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Add Photos</h3>
          <h5>Attach to your apartments and houses</h5>
        </div>
        <div className="dashboardBody">
          <AddPhoto />
        </div>
      </div>
    );
  }
}

export default ApartmentPhotos;