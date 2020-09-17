import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';


// interface ListingState {
//   isLoading: boolean;
//   isShowError: boolean;
//   accountDats: any[];
//   columns: any[];
// }


const columns = [
  {
    key: "id",
    text: "#",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "bill_name",
    text: "Billing Name",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "apartment_id",
    TrOnlyClassName: 'tsc',
    text: "Apartment ID",
    className: "tsc",
  },
  
];

const config = {
  key_column: "tsc",
  length_menu: [10, 20, 50],
  show_filter: true,
  show_pagination: true,
  pagination: 'basic',
  page_size: 10,
  show_length_menu: true,
  language: {
    loading_text: "Please be patient while data loads..."
  }

}

class Invoice extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }
  componentDidMount() {
    const config = {
      headers: {
        "Authorization": `Bearer ` + TOKEN }
    };
    axios.get(baseURL + 'invoices ', config).then(res => {
      this.setState({ statusMessage: res.data.status_message, isShowError: false, isLoading: false });
      //console.log("LOOG" , res.data.status_message);
      this.setState({
        accountDats: res.data,
        isLoading: false,
      },
        function () {
          console.log("recrd", res.data);
        });
    });
  }
  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Invoices Generated</h3>
          <h5></h5>
        </div>
        <div className="dashboardBody">

          <div className="panel-body" >
            <br /><br />
            {this.state.isShowError ?
              <div className="alert alert-success" > {this.state.statusMessage}
              </div> : null
            }
            < ReactDatatable
              config={config}
              records={
                this.state.accountDats
              }
              id="tsc"
              columns={columns}
              loading={this.state.isLoading}
            />

          </div>
        </div>
      </div>
    );
  }
}


export default Invoice;