import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
//import Header from '../HomePage/Components/Header';
import Footer from '../HomePage/Components/Footer';
import Listing from '../Listings/component/Listing';

//import ListProperty from './Components/ListProperty';

class ListHome extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <div>
        {/* <div className="headerWrapper">
          <Header/>
        </div> */}
        <div className="bodyWrapper">
          <Listing />
        </div>
        <div className="footerWrapper">
          <Footer />
        </div>
      </div>
    );
  }
}

export default ListHome;