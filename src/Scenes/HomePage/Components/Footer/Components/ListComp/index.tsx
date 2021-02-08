import * as React from 'react';
import './style.css';

interface ListCompProps {
  list: string[];
}

class ListComp extends React.Component<ListCompProps, {}> {
  constructor(props: ListCompProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="listComp col-xs-4 col-sm-4 col-md-4 col-lg-4">
        <div className="listCompTitle osLight">
          <p>
            <strong>ABOUT US</strong>
          </p>
          <p>
            Kelma Comfort Limited is a Kenyan billing service at once comfort
            zone. Kelma continues to grow towards the achievement of its vision
            to become the next comfort bills company leader in Africa.
          </p>
          <p>
            <strong>Mission:</strong>
          </p>
          <p>
            To create a comfort bill payment solution system that is convenient,
            secure and cost-effective.
          </p>
          <p>
            <strong>Vision:</strong>
          </p>
          <p>“To be the next comfort bills company leader in Africa.”</p>

          <p>
            <strong>Purpose:</strong>
          </p>
          <p>
           To make life easy for the tenants to pay their bills at their own
            comfort.
          </p>
          <p>
            <strong>Core Values:</strong>
          </p>
          <ul>
            <li>
              <p>-Customer satisfaction</p>
            </li>
            <li>
              <p>Efficiency</p>
            </li>
            <li>
              <p>Honesty</p>
            </li>
            <li>
              <p>Transparency</p>
            </li>
            <li>
              <p>Trustworthiness</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ListComp;
