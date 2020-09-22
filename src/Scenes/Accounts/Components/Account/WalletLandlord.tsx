import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { ID, TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import Dashboard from 'Components/DashboardLayout';
import * as moment from 'moment';


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

class WalletLandlord extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }

async componentDidMount() {
  const [transactionResponse, complainResponse, tenantResponse, houseResponse, apartmentResponse, usersResponse] = await Promise.all([
    axios.get(baseURL + "wallets", { headers: { "Authorization": `Bearer ` + TOKEN } }),
    axios.get(baseURL + "leases", { headers: { "Authorization": `Bearer ` + TOKEN } }),
    axios.get(baseURL + "tenants?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
    axios.get(baseURL + "houses?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
    axios.get(baseURL + "apartments?landLord_id=" + ID, { headers: { "Authorization": `Bearer ` + TOKEN } }),
    axios.get(baseURL + "users?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),


  ]);
  this.setState(
    {
      transaction: transactionResponse.data,

      complian: complainResponse.data,
      users: usersResponse.data,
      houses: houseResponse.data,
      apartment: apartmentResponse.data,
      tenants: tenantResponse.data,
      isLoading: false
    },
    function () {
      console.log("lease", tenantResponse.data);
    });
  /// var data = [];

  var data = [];
  for (let p = 0; p < this.state.transaction.length; p++) {

    for (let i = 0; i < this.state.complian.length; i++) {
      //alert(this.state.users[i].id);
      let index = { idx: i + 1 };

      for (let j = 0; j < this.state.houses.length; j++) {
        //   var user_id = this.state.complian[i].user_id;
        var house_id = this.state.complian[i].house_id;
        if (house_id == this.state.houses[j].id) {
          for (let l = 0; l < this.state.apartment.length; l++) {
            var apartment_id = this.state.houses[j].apartment_id;
            if (apartment_id == this.state.apartment[l].id) {
              for (let m = 0; m < this.state.users.length; m++) {

                for (let k = 0; k < this.state.tenants.length; k++) {
                  var user_id = this.state.tenants[k].user_id;

                  console.log("userID", user_id)
                  if (user_id == this.state.users[m].id) {

                    if (this.state.users[m].id == this.state.complian[i].customer_id) {
                      if (this.state.tenants[k].user_id == this.state.transaction[p].customer_id) {

                        let date = { dates: moment(this.state.transaction[p].created_at).format('DD MMM, YYYY HH:MM') };
                        data.push(Object.assign(index, this.state.transaction[p], this.state.users[m], date))
                        this.setState({
                          data: data
                        });
                      }

                    }

                  }
                }
              }
            }
          }
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


export default WalletLandlord;