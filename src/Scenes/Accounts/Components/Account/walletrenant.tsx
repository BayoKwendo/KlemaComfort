import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import Dashboard from 'Components/DashboardLayout';
import * as moment from 'moment';
import { MSIDN } from 'Helpers/isLoggedIn';


// interface ListingState {
//   isLoading: boolean;
//   isShowError: boolean;
//   accountDats: any[];
//   columns: any[];
// }


const columns = [
  {
    key: "idx",
    text: "#",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",

  },
  {
    key: "first_name",
    text: "Tenant Name",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  }, {
    key: "last_name",
    text: "Last Name",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "id_number",
    text: "ID Number",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "msisdn",
    text: "Phone Number",
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
    key: "total_deposits",
    text: "Total Deposits",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },

  {
    key: "amount_used",
    text: "Amount Used",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "dates",
    text: "Created At",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  }
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

class WalletTenant extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }


  async componentDidMount() {
    const [walletResponse, usersResponse] = await Promise.all([
      axios.get(baseURL + "wallets", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "users?limit=1000&&role_id=4", { headers: { "Authorization": `Bearer ` + TOKEN } }),


    ]);
    this.setState(
      {
        wallet: walletResponse.data,
        users: usersResponse.data,
        isLoading: false
      },
      function () {
        console.log("lease", walletResponse.data);
      });
    /// var data = [];

    var data = [];
    for (let i = 0; i < this.state.wallet.length; i++) {
      //alert(this.state.users[i].id);
      let index = { idx: i + 1 };

      for (let j = 0; j < this.state.users.length; j++) {
        //   var user_id = this.state.complian[i].user_id;       

        if (this.state.users[j].id == this.state.wallet[i].customer_id) {
          if (MSIDN == this.state.wallet[i].msisdn) {

            let date = { dates: moment(this.state.wallet[i].created_at).format('DD MMM, YYYY HH:MM') };
            data.push(Object.assign(index, this.state.wallet[i], this.state.users[j], date))
            this.setState({
              data: data
            });
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="searchPage">
        <Dashboard>

          <div className="searchFormWrapper">
            <div className="dashboardTitle">
              <h3>Wallet</h3>
              {/* <h5>Below are the wallet that have been made.</h5> */}
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
                  records={this.state.data}
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


export default WalletTenant;