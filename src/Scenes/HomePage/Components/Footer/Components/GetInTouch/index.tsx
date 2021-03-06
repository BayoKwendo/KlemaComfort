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
          <li className="footer-phone"><span className="fa fa-phone"/> 0711939396</li>
          <li className="footer-email"><span className="fa fa-mail"/><a style={{color: 'blue'}}> dm@kelmacomfort.com</a></li>

          <li className="footer-address osLight">
            <p>Embakasi Old airport north road, AA junction opposite kobil petrol stationType a message,</p><br/>
            <p>P.o box 2512-0200 Nairobi kenya</p>
            {/* <p>Ho Chi Minh</p> */}
          </li>
          <li>
          <a href="https://www.facebook.com/cribmtaani" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-facebook"/>
          </a> 
          
          <a href="https://www.linkedin.com/in/crib-mtaani-a99967187/" className="btn btn-sm btn-icon btn-round btn-o btn-white">
            <span className="fa fa-linkedin"/>
          </a> 
          </li>
        </ul>
      </div>
    );
  }
}

export default GetInTouch;