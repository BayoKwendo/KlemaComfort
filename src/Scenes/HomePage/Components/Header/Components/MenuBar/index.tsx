import * as React from 'react';
import './style.css';
import { Icon } from 'react-fa';
import { connect } from 'react-redux';
import RLForm from 'Components/RegisterLoginForm';
import UserMenu from 'Components/UserMenu';
import { Link } from 'react-router-dom';
import { getTranslation, SupportedLanguage } from 'Services/Geo';
// import LanguageSelector from 'Components/LanguageSelector';
import { RootState } from 'Redux/Store';
import { isLoggedIn } from 'Helpers/isLoggedIn';

const mapStateToProps = (state: RootState) => ({
  lang: state.status.lang,
  isPersist: state.status.isPersist,
  isLogin: state.user.isLogin
});

interface MenuBarProps {
  lang: SupportedLanguage;
  isPersist: boolean;
  isLogin: boolean;
}

interface MenuBarState {
  isHandlerActive: boolean;
  rlFormStatus?: 'login' | 'register'; 
  isLogin: boolean;
}

class MenuBar extends React.Component<MenuBarProps, MenuBarState> {
  constructor(props: MenuBarProps) {
    super(props);
    this.state = {
      isHandlerActive: false,
      isLogin: props.isLogin
    };
  }
  toggleHandler = () => {
    this.setState({
      isHandlerActive: !this.state.isHandlerActive
    });
  }
  updateFormStatus = (status?: 'login' | 'register') => {
    this.setState({
      rlFormStatus: status
    });
  }

  loginField = () => {
    if (this.state.isLogin) {
      return (
        <li className="userMenuLi">
          <div className="userMenuWrapper">
            <UserMenu />
          </div>
        </li>
      );
    }
    return [
      // (
      //   <li key="0"><a href="#" onClick={() => this.updateFormStatus('register')}>
      //     {getTranslation(this.props.lang, 'Registration')}
      //   </a></li>
      // ),
      (
         <li key="1"><a href="#" onClick={() => this.updateFormStatus('login')}>
          
          {getTranslation(this.props.lang, 'Login')}
        </a></li>
      )
    ];
  }

  checkLogins = () => {
    if (isLoggedIn == "false") {

      alert("You have to login first");
      // window.location.href = "/";
    } else {
      window.location.href = "/newproperty/sell";
    }


  }
  render() {
    if (!this.props.isPersist) {
      return (null);
    }
    return (
      <div className="menuBar">
        <div className="langSelectorWrapper">
        
        </div>
        <a href="/">
          <div className="homeLogo osLight">
            <Icon name="home" size="2x" /> 
            <span>Kelma Comfort</span>
          </div>
        </a>
        <a 
          href="#" 
          className={'homeNavHandler visible-xs' + (this.state.isHandlerActive ? ' active' : '')} 
          onClick={this.toggleHandler}
        >
          <Icon name="bars" />
        </a>
        <div className={'homeNav' + (this.state.isHandlerActive ? ' active' : '')} >
          <ul>
            {/* <li className="moreOption">
              <Link to="/search?type=rent">{getTranslation(this.props.lang, 'Rent')}</Link>
            </li> */}
            <li className="moreOption">
              <Link to="/listing">{getTranslation(this.props.lang, 'Listing')}</Link>
            </li>
            {/* <li className="moreOption">
              <Link to="/agent/search">{getTranslation(this.props.lang, 'Renovation')}</Link>
            </li>
            <li className="moreOption">
              <Link to="/agent/search">{getTranslation(this.props.lang, 'Commercial')}</Link>
            </li> */}
            {/* <li className="moreOption">
              <Link to="/projects">{getTranslation(this.props.lang, 'Project')}</Link>
            </li> */}
            {/* <li className="moreOption">
              <Link to="/agent/search">{getTranslation(this.props.lang, 'Find agent')}</Link>
            </li> */}
            {this.loginField()}
            
            <li>
              <button onClick={this.checkLogins} className="btn btn-green"><div >
                {getTranslation(this.props.lang, 'List a Property')}
              </div></button>
            </li>
          </ul>
        </div>
        <RLForm 
          type={this.state.rlFormStatus} 
          openRegisterForm={() => this.updateFormStatus('register')} 
          openLoginForm={() => this.updateFormStatus('login')}
          close={() => this.updateFormStatus()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(MenuBar);