import * as React from 'react';
import './Bootstrap/bootstrap.min.css';
import './style.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getUserToken } from 'Services/Api/Token';
import { SupportedLanguage } from 'Services/Geo';
import { connect, Dispatch } from 'react-redux';
import { RootState } from 'Redux/Store';
import { authenticate } from 'Redux/Modules/User';
import HomePage from 'Scenes/HomePage';
import WalletPage from 'Scenes/WalletPage';
import PageInfo from 'Scenes/MyInfoPage';
import SearchPage from 'Scenes/SearchPage';
import MyhousePage from 'Scenes/MyhousePage';
import NewPropertyPage from 'Scenes/NewPropertyPage';
//import Listing from 'Scenes/Listings/component/Listing';
import ListView from 'Scenes/Listings/component/ListView';
import ListHome from 'Scenes/Listings';

import AgentPage from 'Scenes/AgentPage';
import AdvicePage from 'Scenes/AdvicePage';

import NewsPage from 'Scenes/NewsPage';
import UsersPage from 'Scenes/Users';
import AccountPage from 'Scenes/Accounts';
import InvoicePage from 'Scenes/Invoice';
import ComplainPage from 'Scenes/Complants';
import Posts from 'Scenes/AddPosts/Components/Posts';
import LeasePage from 'Scenes/leases';
import ComplainsLandLoard from 'Scenes/Complants/Components/Complains/LandLoard';
import Transaction from 'Scenes/Accounts/Components/Account/Transactions';
import AddPay from 'Scenes/Accounts/Components/Account/payments';
import Wallet from 'Scenes/Accounts/Components/Account/Wallet';
import LeaseLandlord from 'Scenes/leases/Components/Lease/leaseLandloard';
import LeaseTenant from 'Scenes/leases/Components/Lease/leaseTenant';

import AgentComplain from 'Scenes/Complants/Components/Complains/AgentComplain';
import AddAgreement from 'Scenes/leases/Components/Lease/AddAgreement';
import Map from 'Components/Maps/maps';
import PostsList from 'Scenes/AddPosts/Components/Posts/posts';
import PasswordReset from 'Scenes/Users/userresetpasswd';
import TransactionLand from 'Scenes/Accounts/Components/Account/TransactionsLand';
import TransactionTenant from 'Scenes/Accounts/Components/Account/TransactionTenant';

import WalletLandlord from 'Scenes/Accounts/Components/Account/WalletLandlord';
import WalletTenant from 'Scenes/Accounts/Components/Account/walletrenant';

const mapStateToProps = (state: RootState) => ({
  lang: state.status.lang
});
const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  authUser: () => {
    dispatch(authenticate());
  }
} );

interface AppProps {
  authUser: () => void;
  lang: SupportedLanguage;
}

class App extends React.Component<AppProps, {}> {
  componentDidMount() {
    const userToken = getUserToken();
    if (userToken) {
      this.props.authUser();
    }
  }
  render() {
    return (
      <Router>
        <div className="globalContainer">
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/listing" component={ListHome}/>
          <Route exact={true} path="/user/:action" component={UsersPage} />

          <Route exact={true} path="/wallet/:action?" component={WalletPage} />
          <Route exact={true} path="/search/:action?" component={SearchPage} />
          <Route exact={true} path="/property/:id?" component={MyhousePage} />
          <Route exact={true} path="/newproperty/:action" component={NewPropertyPage} />
          <Route exact={true} path="/myprofile" component={PageInfo} />
          <Route exact={true} path="/advice/:type" component={AdvicePage} />
          <Route exact={true} path="/agent/:action" component={AgentPage} />
          <Route exact={true} path="/ListView/:id" component={ListView}/>

          <Route exact={true} path="/projects" component={NewsPage} />

          <Route exact={true} path="/accounts" component={AccountPage} />
          <Route exact={true} path="/agreement" component={AddAgreement} />

          <Route exact={true} path="/accoucnts" component={Map} />
          <Route exact={true} path="/account/create-password/:token" component={PasswordReset} />
          <Route exact={true} path="/leaseLandLord" component={LeaseLandlord} />
          <Route exact={true} path="/agencomplain" component={AgentComplain} />
         <Route exact={true} path="/leaseTenant" component={LeaseTenant} />
         <Route exact={true} path="/transactionLand" component={TransactionLand} />
         <Route exact={true} path="/walletLand" component={WalletLandlord} />

         <Route exact={true} path="/transactionTenant" component={TransactionTenant} />
         <Route exact={true} path="/wallettenat" component={WalletTenant} />

          <Route exact={true} path="/complain/:action" component={ComplainPage} />

          <Route exact={true} path="/invoice" component={InvoicePage} />
          <Route exact={true} path="/posts" component={Posts} />
          <Route exact={true} path="/post-list" component={PostsList} />

          <Route exact={true} path="/complain" component={ComplainsLandLoard} />

          <Route exact={true} path="/lease" component={LeasePage} />

          <Route exact={true} path="/transaction" component={Transaction} />

          <Route exact={true} path="/payments" component={AddPay} />
          <Route exact={true} path="/walletss" component={Wallet} />



        </div>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
