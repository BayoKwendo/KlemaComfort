import * as React from 'react';
import './style.css';
import AddPhoto from '../AddPhoto';

class ApartmentPhotos extends React.Component<{}, {}> {
  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Add Photos</h3>
          <h5>We'd love to find out more about you. It'll help us make
                sure our website and apps tick the right boxes.</h5>
        </div>
        <div className="dashboardBody">
          <AddPhoto />
        </div>
      </div>
    );
  }
}

export default ApartmentPhotos;