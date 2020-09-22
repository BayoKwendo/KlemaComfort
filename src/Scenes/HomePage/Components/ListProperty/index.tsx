import * as React from 'react';
import './style.css';
import { TOKEN } from 'Helpers/token';
import { baseURL } from 'Helpers/baseURL';
import axios from 'axios';
import Listing from './Listing';
import ListingHigh from './ListHighlights';


interface SearchFormState {
  resultTab: 'list' | 'map';
  apartments: any[],
  statusMessage:string
}

class ListProperty extends React.Component<{}, SearchFormState> {
  constructor() {
    super();
    this.state = {
      resultTab: 'list',
      statusMessage:'',
      apartments: []
    };
  }
  componentDidMount() {
    const config = {
      headers: {
        "Authorization": `Bearer ` + TOKEN
      }
    };

    axios.get(baseURL+'posts/3?limit=3', config).then(res => {
      this.setState({ statusMessage: res.data.status_message });
      this.setState({
        apartments: res.data,
      },
        function () {
          console.log("recrd", res.data);
          console.log("LOOG" , res.data.status_message);

        });

    });

  }


  render() {

   
    return (
      <>
      <div className="listProperty">
        <div className="row listPropertyHeader">
          <h3>Recently Listed </h3>
         {/* <h5>Fusce risus metus, placerat in consectetur eu, porttitor a est sed sed dolor lorem cras adipiscing</h5> */}
        </div>
       
        <Listing/>
      </div>
       <div className="listProperty">
       <div className="row listPropertyHeader">
         <h3>Most Featured Apartments</h3>
        {/* <h5>Fusce risus metus, placerat in consectetur eu, porttitor a est sed sed dolor lorem cras adipiscing</h5> */}
       </div>
      
       <ListingHigh/>
     </div>
     </>
    );
  }
}

export default ListProperty;