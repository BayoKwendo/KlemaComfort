import * as React from 'react';
import './style.css';
import Dashboard from 'Components/DashboardLayout';
import { RouteComponentProps } from 'react-router-dom';
import SellPage from './Components/Sell';
import RentPage from './Components/Rent';
import RenovationPage from './Components/Renovation';
import AddNewPropertyForm from './Components/AddNewPropertyForm';
import ApartmentPhotos from './Components/ApartmentPhotos';
import Posts from './Components/Posts';

class NewPropertyPage extends React.Component<RouteComponentProps<{ action: string }>, {}> {
  newPropertyAction: {
    sell: JSX.Element;
    rent: JSX.Element;
    photo: JSX.Element;
    posts: JSX.Element;
    renovation: JSX.Element;
    default: JSX.Element;
  };
  constructor() {
    super();
    this.newPropertyAction = {
      sell: <SellPage />,
      rent: <RentPage />,
      photo: <ApartmentPhotos />,
      posts: <Posts/>,
      renovation: <RenovationPage />,
      default: <AddNewPropertyForm />
    };
  }
  matchAction = () => {
    const section = this.props.match.params.action;
    switch (section) {
      case 'sell':
        return this.newPropertyAction.sell;
      case 'rent':
        return this.newPropertyAction.rent;
      case 'photo':
        return this.newPropertyAction.photo;
      case 'posts':
        return this.newPropertyAction.posts;
      case 'renovation':
        return this.newPropertyAction.renovation;
      default:
        return this.newPropertyAction.default;
    }
  }
  render() {
    return (
      <div className="infoPage">
        <Dashboard >
          <div className="infoWrapper">
            {this.matchAction()}
          </div>
        </Dashboard>
      </div>
    );
  }
}

export default NewPropertyPage;