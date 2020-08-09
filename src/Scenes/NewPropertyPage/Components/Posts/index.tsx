import * as React from 'react';
import './style.css';
import AddPosts from '../AddPosts';

class Posts extends React.Component<{}, {}> {
  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Add Posts</h3>
          <h5>We'd love to find out more about you. It'll help us make
                sure our website and apps tick the right boxes.</h5>
        </div>
        <div className="dashboardBody">
          <AddPosts />
        </div>
      </div>
    );
  }
}

export default Posts;