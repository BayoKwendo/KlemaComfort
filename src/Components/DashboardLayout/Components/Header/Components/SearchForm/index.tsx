import * as React from 'react';
import './style.css';

// import { Icon } from 'react-fa';

class SearchForm extends React.Component<{}, {}> {
  render() {
    return (
      <div className="search">
        <input type="text"  disabled={true} placeholder="Kelma Comfort" />
      </div>
    );
  }
}

export default SearchForm;