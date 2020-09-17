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
    key: "idx",
    text: "#",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "house_number",
    text: "House Number",
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
    key: "first_name",
    text: "First Name",
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
  
  // {
  //   key: "account_status",
  //   text: "Account Status",
  //   TrOnlyClassName: 'tsc',
  //   className: "tsc",
  //   align: "left",
  // },
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

class CARETAKER extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }


  async componentDidMount() {

    const [usersResponse, complainResponse, houseResponse, apartmentResponse,] = await Promise.all([

      axios.get(baseURL + "users?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "roles", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "houses", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "apartments", { headers: { "Authorization": `Bearer ` + TOKEN } }),

    ]);
    this.setState(
      {
        complian: complainResponse.data,
        users: usersResponse.data,
        houses: houseResponse.data,
        apartment: apartmentResponse.data,
        isLoading: false
      },
      function () {
        console.log("teachers", complainResponse.data);
      });
    /// var data = [];

    var data = [];
    var da = 0
  
      for (let l = 0; l < (this.state.houses.length || da); l++) {
       let index = { idx: l+1}
       for (let k = 0; k < this.state.apartment.length; k++) {
        if (this.state.apartment[k].id == this.state.houses[l].apartment_id) {
          for (let i = 0; i < (this.state.users.length || da); i++) {
            var user_id = this.state.users[i].id;
            if (user_id == this.state.houses[l].caretaker_id) { 
              for (let j = 0; j < this.state.complian.length; j++) {
                var user_role = this.state.users[i].role_id
                if (user_role == this.state.complian[j].id) {
                 
                  data.push(Object.assign( index,this.state.houses[l],this.state.apartment[k], this.state.users[i],this.state.complian[j],))
                  this.setState({
                    data: data
                  });
                  console.log("apartments",this.state.data )
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
          <h3>List of Caretakers</h3>
          <h5>These are list of Caretakers registered with their houses</h5>
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
    );
  }
}


export default CARETAKER;