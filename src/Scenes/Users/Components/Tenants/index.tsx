import React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN, da } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import { Link } from 'react-router-dom';


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
    key: "username",
    TrOnlyClassName: 'tsc',
    text: "UserName",
    className: "tsc",
  },
  {
    key: "email_address",
    text: "Email Address",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "msisdn",
    text: "Mobile Number",
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
    key: "kra_pin",
    text: "KRA PIN",
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
    key: "next_kin",
    text: "Next KIN",
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
    key: "agreement_source",
    text: "options",
    TrOnlyClassName: 'cell',
    className: "cell",
    width: 160,
    align: "center",
    sortable: false,
    cell: record => {
      return (
        <>
          <button
            className="btn btn-primary btn-sm text-center"
            // onClick={() => this.editRecord(record)}
            style={{ marginRight: '5px', textAlign: 'center' }}>
            <span className="fa fa-edit dt-icon-btn">Edit</span>
          </button>
          <button
            className="btn btn-danger btn-sm text-center"
            // onClick={() => this.editRecord(record)}
            style={{ marginRight: '5px', textAlign: 'center' }}>
            <span className="fa fa-trash dt-icon-btn">Delete</span>
          </button>
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

class TENANTS extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }
  async componentDidMount() {
    const [usersResponse, houseResponse, apartmentResponse, tenantResponse] = await Promise.all([
      axios.get(baseURL + "tenants", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "houses", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "apartments", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "users?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),


    ]);
    this.setState(
      {
        users: usersResponse.data,
        houses: houseResponse.data,
        apartment: apartmentResponse.data,
        tenants: tenantResponse.data,
        isLoading: false
      },
      function () {
        console.log("teachers", apartmentResponse.data);
      });
    var data = [];
    for (let j = 0; j < (this.state.houses.length || da); j++) {
      var house_id = this.state.houses[j].id;
      for (let l = 0; l < this.state.apartment.length; l++) {
        var apartment_id = this.state.houses[j].apartment_id;
        if (apartment_id == this.state.apartment[l].id) {
          for (let k = 0; k < this.state.users.length; k++) {
            var user_id = this.state.users[k].user_id;
            for (let m = 0; m < this.state.tenants.length; m++) {
              if (user_id == this.state.tenants[m].id) {
                if (house_id == this.state.users[k].house_id) {
                  let index = { idx: k + 1 };
                  data.push(Object.assign(index, this.state.houses[j], this.state.apartment[l], this.state.users[k], this.state.tenants[m]))
                  this.setState({
                    data: data
                  })

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
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Tenants</h3>
          <h5>The below contain detail info tenants</h5>
        </div>
        <div className="dashboardBody">

          <div className="panel-body" >
            <div className="pull-right">
              <Link to="/user/tenants"><button className="btn btn-green" >Add Tenant</button></Link>
            </div>
            <br /><br /><br /><br />
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
    );
  }
}


export default TENANTS;