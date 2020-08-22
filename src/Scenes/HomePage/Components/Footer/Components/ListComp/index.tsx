import * as React from 'react';
import './style.css';

interface ListCompProps {
  list: string[];
}

class ListComp extends React.Component<ListCompProps, {}> {
  constructor(props: ListCompProps) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div className="listComp col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="listCompTitle osLight">
          {this.props.children}
        </div>
        <ul className="listMain">
          {this.props.list.map((item, index) => {
            return (
              <li key={index}><a href="#">{item}</a></li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListComp;