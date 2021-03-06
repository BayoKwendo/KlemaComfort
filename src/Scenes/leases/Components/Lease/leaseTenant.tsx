import React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { ID, TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import * as moment from 'moment';
import Dashboard from 'Components/DashboardLayout';


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
    key: "next_kin",
    text: "Next of KIN",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "family_size",
    text: "Family Size",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "apartment_name",
    TrOnlyClassName: 'tsc',
    text: "Apartment Name",
    className: "tsc",
  },
  {
    key: "house_number",
    text: "House Number",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "house_type",
    text: "House Type",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "lease_period",
    text: "Lease Period",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "dates",
    text: "Lease End Date",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "status",
    text: "Status",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "unit",
    text: "Units",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },

  {
    key: "agreement",
    text: "Agreement",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },

  {
    key: "action",
    text: "Download Agreement",
    TrOnlyClassName: 'cell',
    className: "cell",
    width: 160,
    align: "center",
    sortable: false,
    cell: record => {
      return (
        <>
          <a href="https://primecribsb3.s3.us-east-2.amazonaws.com/HOUSE_RENTAL_AGREEMENT2.pdf">
            <button
              className="btn btn-green btn-sm"
              title="Upload"
              style={{ fontSize: '12px' }}
            >

              <span className="fa fa-upload dt-icon-btn"> Download document</span>
            </button>
          </a>
        </>
      );
    }
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

class LeaseTenant extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };
  }
  async componentDidMount() {

    const [complainResponse, tenantResponse, houseResponse, apartmentResponse, usersResponse] = await Promise.all([
      axios.get(baseURL + "leases", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "tenants?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "houses?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "apartments", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "users?id="+ID, { headers: { "Authorization": `Bearer ` + TOKEN } }),


    ]);
    this.setState(
      {
        complian: complainResponse.data,
        users: usersResponse.data,
        houses: houseResponse.data,
        apartment: apartmentResponse.data,
        tenants: tenantResponse.data,
        isLoading: false
      },
      function () {
        console.log("lease", usersResponse.data);
      });
    /// var data = [];

    var data = [];
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

                      localStorage.setItem("item", this.state.complian[i].id)
                      if (this.state.complian[i].agreement_source === "default.png") {
                        alert("You seem you do not have an agreement. Kindly upload one!")
                      }

                      console.log("EVANS", this.state.data);
                      let date = { dates: moment(this.state.complian[i].lease_end_date).format('DD MMM, YYYY') };
                      data.push(Object.assign(index, this.state.complian[i], 
                        this.state.houses[j], this.state.apartment[l], date, 
                        this.state.users[m], this.state.tenants[k]))
                      this.setState({
                        data: data
                      })

                      console.log("data", this.state.data)
        
                     
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



  upload(record) {
    console.log("Delete Record", record);

    this.setState({
      school_id: record.id,
    });

  }




  render() {
    return (
      <div className="searchPage">
        <Dashboard>

          <div className="searchFormWrapper">
            <div className="rentPropertyPage">
              <div className="dashboardTitle">
                <h3>Your Lease Info</h3>
                <h5>The below contain detail info your lease</h5>
              </div>
              <div className="dashboardBody">

                <div className="panel-body" >
                  <br /><br />
                  {this.state.isShowError ?
                    <div className="alert alert-success" > {this.state.statusMessage}
                    </div> : null
                  }
                  < ReactDatatable config={config}
                    records={this.state.data}
                    id="tsc"
                    columns={columns}
                    loading={this.state.isLoading}
                  />

                </div>
              </div>
            </div>
          </div>
        </Dashboard>
      </div>
    );
  }
}


export default LeaseTenant;