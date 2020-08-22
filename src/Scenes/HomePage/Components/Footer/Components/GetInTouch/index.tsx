import * as React from 'react';
import './style.css';

class GetInTouch extends React.Component<{}, {}> {
  
  render() {
    return (
      <div className="getInTouch col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="touchTitle osLight">
          {this.props.children}
        </div>
        <ul className="mainList">
          <li className="footer-phone"><span className="fa fa-phone"/> 254717629732</li>
          <li className="footer-address osLight">
            <p>OnfonMediac,</p>
            <p>Nairobi 4 ,</p>
            {/* <p>Ho Chi Minh</p> */}
          </li>
          <li>
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-facebook"/>
          </a> 
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-twitter"/>
          </a> 
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-google-plus"/>
          </a> 
          <a href="#" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-linkedin"/>
          </a> 
          </li>
        </ul>
      </div>
    );
  }
}

export default GetInTouch;