import * as React from 'react';
import './style.css';

import ListComp from './ListComp';
import GetInTouch from './GetInTouch';
import Subscribe from './Subscribe';

class FooterContainer extends React.Component<{}, {}> {
  listCompany =  [
    // 'About',
    // 'Jobs',
    // 'Press',
    // 'Blog',
    // 'Help',
    // 'Policies',
    // 'Terms & Privacy'
  ];
  listDiscover = [
    // 'Become a Member',
    // 'Properties List',
    // 'Sign in',
    // 'Widgets',
    // 'Components',
    // 'Tables',
    // 'Lists'
  ];
  render() {
    return (
      <div className="footerContainer">
        <div className="row">
            <ListComp list={this.listCompany}>Kelma Comfort</ListComp>
            {/* <ListComp list={this.listDiscover}>Discover</ListComp> */}
            <GetInTouch>Get in Touch</GetInTouch>
            <Subscribe>Subscribe to Our Newsletter</Subscribe>
        </div>
        <div className="footerCopyRight">
       Kelma Comfort<br/> ©2020 Copyright KelmaComfort

        </div>
      </div>
    );
  }
}

export default FooterContainer;