import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
// import Header from '../HomePage/Components/Header';
import Footer from '../HomePage/Components/Footer';
import Listing from '../Listings/component/Listing';
import MenuBar from 'Scenes/HomePage/Components/Header/Components/MenuBar';

//import ListProperty from './Components/ListProperty';

class ListHome extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    return (
      <div>

        <div   className="btn btn-green" style={{width:'100%'}} color="primary">
          <MenuBar/>
        </div>
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