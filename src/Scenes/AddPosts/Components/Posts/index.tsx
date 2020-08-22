import * as React from 'react';
import './style.css';
import AddPosts from '../AddPosts';
import Dashboard from 'Components/DashboardLayout';

class Posts extends React.Component<{}, {}> {
  render() {
    return (
      <div className="infoPage">
        <Dashboard >
          <div className="infoWrapper">
          <div className="rentPropertyPage">
            <div className="dashboardTitle">
              <h3>Add Posts</h3>
              <h5>Fill the fields below to create Posts</h5>
            </div>
            <div className="dashboardBody">
              <AddPosts />
            </div>
          </div>
          </div>
        </Dashboard>
        </div>
    );
  }
}

export default Posts;