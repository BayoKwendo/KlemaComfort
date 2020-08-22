import * as React from 'react';
import './style.css';

class Subscribe extends React.Component<{}, {}> {

  render() {
    return (
      <div className="subComp col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="subCompTitle osLight">{this.props.children}</div>
        <form role="form">
          <div className="form-group">
            <input type="email" className="form-control" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <a href="#" className="btn btn-green btn-block isThemeBtn">Subscribe</a>
          </div>
        </form>
      </div>
    );
  }
}

export default Subscribe;