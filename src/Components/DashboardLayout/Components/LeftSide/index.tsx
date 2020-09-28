import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';
import { ROLE } from 'Helpers/token';

interface LeftSideProps {
  isExpand: boolean;
}

class LeftSide extends React.Component<LeftSideProps, {}> {
  toggleActive = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.props.isExpand) {
      e.preventDefault();
    }
    const target = e.currentTarget;
    if (this.props.isExpand && target.parentElement) {
      target.parentElement.classList.toggle('active');
    }
  }
  render() {
    return (
      <div className={`leftSide slimScroll${this.props.isExpand ? ' expanded' : ' minimized'}`}>
        <nav className="leftNav scrollable bigNav">
          <ul>
            {ROLE == '3' ?
              <>

                <li><Link to="/leaseLandLord">
                  <Icon className="navIcon" name="home" />
                  <span className="navLabel">Lease</span>
                </Link></li>

                <li><Link to="/complain">
                  <Icon className="navIcon" name="exclamation-triangle" />
                  <span className="navLabel">Complians</span>
                </Link></li>
                <li className="hasSub hasSubActive">
                  <Link to="/accounts" onClick={this.toggleActive}>
                    <Icon className="navIcon" name="money" />
                    <Icon className="closeIcon arrowRight" name="angle-left" />
                    <Icon className="openIcon arrowRight" name="angle-down" />
                    <span className="navLabel">Statements</span>
                  </Link>
                  <ul className="colors secondUl">
                    <li><Link to="/accounts">
                      Accounts<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/transactionLand">
                      Transactions<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    {/* <li><Link to="/walletLand">
                      Wallets<Icon name="circle-o" className="icon-right" />
                    </Link></li> */}
                    {/* <li><Link to="/invoice">
                      Invoice<Icon name="circle-o" className="icon-right" />
                    </Link></li> */}
                  </ul>
                </li>
              </>

              : null}

            {ROLE == '4' ?
              <>
                <li><Link to="/leaseTenant">
                  <Icon className="navIcon" name="home" />
                  <span className="navLabel">Lease</span>
                </Link></li>

                <li><Link to="/agreement">
                  <Icon className="navIcon" name="plus-square" />

                  <span className="navLabel">Add-Agreement</span>
                </Link></li>

                <li className="hasSub hasSubActive">
                  <Link to="/complain/complain" onClick={this.toggleActive}>
                    <Icon className="navIcon" name="exclamation-triangle" />
                    <span className="navLabel">Complains</span>
                    <Icon className="closeIcon arrowRight" name="angle-left" />
                    <Icon className="openIcon arrowRight" name="angle-down" />
                  </Link>
                  <ul className="colors secondUl">
                    <li><Link to="/complain/add">
                      Add Complain<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/complain/complain">
                      Complain<Icon name="circle-o" className="icon-right" />
                    </Link></li>

                  </ul>
                </li>
              
                <li><Link to="/payments">
                  <Icon className="navIcon" name="money" />
                  <span className="navLabel">Payments</span>
                </Link></li>


                <li className="hasSub hasSubActive">
                  <Link to="/accounts" onClick={this.toggleActive}>
                    <Icon className="navIcon" name="money" />
                    <span className="navLabel">Statements</span>
                    <Icon className="closeIcon arrowRight" name="angle-left" />
                    <Icon className="openIcon arrowRight" name="angle-down" />
                  </Link>
                  <ul className="colors secondUl">
                    {/* <li><Link to="/accounts">
                      Accounts<Icon name="circle-o" className="icon-right" />
                    </Link></li> */}
                    <li><Link to="/transactionTenant">
                      Transactions<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/wallettenat">
                      Wallets<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    {/* <li><Link to="/invoice">
                      Invoice<Icon name="circle-o" className="icon-right" />
                    </Link></li> */}
                  </ul>
                </li>
              </>

              : null}
            {ROLE == '1' ?
              <>
                <li className="hasSub hasSubActive">
                  <Link to="/user/role" onClick={this.toggleActive}>
                    <Icon className="navIcon" name="user" />
                    <span className="navLabel">Users</span>
                    <Icon className="closeIcon arrowRight" name="angle-left" />
                    <Icon className="openIcon arrowRight" name="angle-down" />
                  </Link>

                  <ul className="colors secondUl">
                    <li><Link to="/user/role">
                      LandLords<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/user/care">
                      Caretakers<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/user/tenant">
                      Tenants<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/user/users">
                      Add LandLord & Caretaker<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/user/tenants">
                      Add Tenants<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/user/lease">
                      Add Lease<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                  </ul>
                </li>
                <li className="hasSub hasSubActive">
                  <Link to="/newproperty/sell" onClick={this.toggleActive}>
                    <Icon className="navIcon" name="plus-circle" />
                    <span className="navLabel">Add Property</span>
                    <Icon className="closeIcon arrowRight" name="angle-left" />
                    <Icon className="openIcon arrowRight" name="angle-down" />
                  </Link>
                  <ul className="colors secondUl">
                    <li><Link to="/newproperty/sell">
                      Add Apartment<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/newproperty/rent">
                      Add House<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/newproperty/billings">
                      Add Billings<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/newproperty/photo">
                      Add Photo<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                  </ul>
                </li>

                <li className="hasSub hasSubActive">
                  <Link to="/post-list" onClick={this.toggleActive}>
                    <Icon className="navIcon" name="plus-square" />
                    <span className="navLabel">Posts</span>
                    <Icon className="closeIcon arrowRight" name="angle-left" />
                    <Icon className="openIcon arrowRight" name="angle-down" />
                  </Link>
                  <ul className="colors secondUl">
                    <li><Link to="/posts">
                      Add Post<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/post-list">
                      Posts<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                  </ul>
                </li>

                <li><Link to="/lease">
                  <Icon className="navIcon" name="home" />
                  <span className="navLabel">Lease</span>
                </Link></li>
                <li><Link to="/agencomplain">
                  <Icon className="navIcon" name="exclamation-triangle" />
                  <span className="navLabel">Complians</span>
                </Link></li>
                <li className="hasSub hasSubActive">
                  <Link to="/accounts" onClick={this.toggleActive}>
                    <Icon className="navIcon" name="money" />
                    <span className="navLabel">Statements</span>
                    <Icon className="closeIcon arrowRight" name="angle-left" />
                    <Icon className="openIcon arrowRight" name="angle-down" />
                  </Link>
                  <ul className="colors secondUl">
                    <li><Link to="/accounts">
                      Accounts<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/transaction">
                      Transactions<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/walletss">
                      Wallets<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                    <li><Link to="/invoice">
                      Invoice<Icon name="circle-o" className="icon-right" />
                    </Link></li>
                  </ul>
                </li>

                {/* <li><Link to="/search">
                  <Icon className="navIcon" name="compass" />
                  <span className="navLabel">Search</span>
                </Link></li> */}


              </>

              : null}
          </ul>


        </nav>
      </div>
    );
  }
}

export default LeftSide;
