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
          <li className="footer-phone"><span className="fa fa-phone"/> 0776160006</li>
          <li className="footer-email"><span className="fa fa-mail"/><a style={{color: 'blue'}}> jmuchiri@songoslimited.com</a></li>

          <li className="footer-address osLight">
            <p>Red commercial complex, along Mombasa road,</p>
            <p>P. O. Box 2512 – 0200 Nairobi, KENYA</p>
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