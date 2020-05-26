import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import GlobalStyle from './components/GlobalStyle';
import Listing from './components/Listings/Listing';
import ListView from './components/Listings/ListView';
import Sellpage from './components/SellPage/Sellpage';
import SignupPage from './components/Signup_Login/SignupPage';
import CareTakerReg from './components/Signup_Login/_careTakerRegestration';
import LandLoard from './components/Signup_Login/LandLoard';
import TenantRegestration from './components/Signup_Login/_tenantRegestration';

import Contact from './components/contact/Contact';


const Routes = () => (
  <Router>
    <Fragment>
      <GlobalStyle />
      <Switch>
      
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/Listings" component={Listing}></Route>
        <Route exact path="/Sellpage" component={Sellpage}></Route>
        <Route exact path="/tenants" component={TenantRegestration}></Route>
        <Route exact path="/landlord" component={LandLoard}></Route>

        <Route exact path="/caretaker" component={CareTakerReg}></Route>


        <Route exact path="/contact" component={Contact}></Route>
        <Route path="/ListView/:id" component={ListView}></Route>
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
