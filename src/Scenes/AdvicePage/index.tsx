import * as React from 'react';
import './style.css';
import { RouteComponentProps } from 'react-router-dom';
import Dashboard from 'Components/DashboardLayout';
import NewItem from 'Scenes/NewsPage/Components/NewItem';

class AdvicePage extends React.Component<RouteComponentProps<{type: string}>, {}> {
  listNew = [
    {
      linkImage: 'http://monstermathclub.com/wp-content/uploads/2017/02/nice-homes-great-nice-houses-on-the-beach.jpg',
      title: 'Beautiful house 1',
      address: 'New York',
      date: '22/10/2017',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellendus accusantium modi quod'
    },
    {
      linkImage: 'https://cdn-images-1.medium.com/max/1600/1*v38MEf_ygKKV6yemrICgDA.jpeg',
      title: 'Beautiful house 2',
      address: 'New York',
      date: '22/10/2017',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellendus accusantium modi quod'
    },
    {
      linkImage: 'https://s-media-cache-ak0.pinimg.com/originals/e9/61/d5/e961d52aa9a87bc47a365e6c593421db.jpg',
      title: 'Beautiful house 3',
      address: 'New York',
      date: '22/10/2017',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellendus accusantium modi quod'
    },
    {
      linkImage: 'https://s-media-cache-ak0.pinimg.com/originals/a8/6a/f7/a86af7857e40acb712bbdd0add98b18c.jpg',
      title: 'Beautiful house 4',
      address: 'New York',
      date: '22/10/2017',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum repellendus accusantium modi quod'
    }
  ];
  render() {
    return (
      <div className="advicePage">
        <Dashboard>
          <div className="dashboardTitle">
            <h3>Advices ({this.props.match.params.type})</h3>
          </div>
          <div className="dashboardBody row">
              {/* <div className="bigItemWrapper">
                <BigItem linkImage={this.linkBigItem} />
              </div> */}
              <div className="newItemWrapper container">
                {this.listNew.map((item, index) => {
                  return (
                    <div className="col-xs-12 col-sm-12 col-md-6" key={index}>
                      <NewItem data={item} />
                    </div>
                  );
                })}
              </div>
            </div>
        </Dashboard>
      </div>
    );
  }
}

export default AdvicePage;