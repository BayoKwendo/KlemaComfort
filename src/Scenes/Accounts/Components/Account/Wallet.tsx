import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import Dashboard from 'Components/DashboardLayout';


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
    key: "current_amount",
    text: "Current Amount",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "amount_transacted",
    text: "Amount Transacted",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },

  {
    key: "total_amount",
    text: "Ttoal Amount",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  

  {
    key: "customer_type",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    text: "Customer Type",
    align: "left"
  },
  {
    key: "status",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    text: "Status",
    align: "left"
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

class Wallet extends React.Component<{}, any> {
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
        "Authorization": `Bearer ` + TOKEN
      }
    };
    axios.get(baseURL + 'wallets?customer_id=7', config).then(res => {

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
      <div className="searchPage">
        <Dashboard>

          <div className="searchFormWrapper">
            <div className="dashboardTitle">
              <h3>Wallet</h3>
              <h5>Below are the wallet that have been made.</h5>
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
                  records={this.state.accountDats}
                  id="tsc"
                  columns={columns}
                  loading={this.state.isLoading}
                />

              </div>
            </div>
          </div>
        </Dashboard>
      </div>
    );
  }
}


export default Wallet;