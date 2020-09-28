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
    key: "title",
    text: "Complain",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "description",
    text: "Description",
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

class AgentComplain extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }
  async componentDidMount() {

    const [complainResponse, usersResponse, houseResponse, apartmentResponse] = await Promise.all([
      axios.get(baseURL + "complaints", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      axios.get(baseURL + "users?limit=1000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
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
        console.log("teachers", houseResponse.data);
      });
    /// var data = [];

    var data = [];
    for (let i = 0; i < this.state.complian.length; i++) {
      //alert(this.state.users[i].id);
      for (let j = 0; j < this.state.houses.length; j++) {
        var house_id = this.state.complian[i].house_id;
        //   var user_id = this.state.complian[i].user_id;
        console.log("EVANS", this.state.houses[j].id);

        let index = { idx: i + 1 };
        // var house_id = this.state.houses[j].id;
        if (house_id == this.state.houses[j].id) {


          for (let k = 0; k < this.state.users.length; k++) {
            var user_id = this.state.complian[i].user_id;

            if (user_id == this.state.users[k].id) {

              for (let l = 0; l < this.state.apartment.length; l++) {

                var apartment_id = this.state.houses[j].apartment_id;

                if (apartment_id == this.state.apartment[l].id) {
                  data.push(Object.assign(index, this.state.complian[i], this.state.houses[j], this.state.users[k], this.state.apartment[l]))
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
      <>
     
          <Dashboard >
            <div className="infoWrapper">

              <div className="rentPropertyPage">
                <div className="dashboardTitle">
                  <h3>Complains</h3>
                  <h5>These are list of complains posted by tenants</h5>
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
        </>
    );
  }
}


export default AgentComplain;