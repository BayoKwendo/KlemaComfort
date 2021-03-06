import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import { Link } from 'react-router-dom';


// interface ListingState {
//   isLoading: boolean;
//   isShowError: boolean;
//   accountDats: any[];
//   columns: any[];
// }


const columns = [
  // {
  //   key: "idx",
  //   text: "#",
  //   TrOnlyClassName: 'tsc',
  //   className: "tsc",
  //   align: "left",
  // },
  // {
  //   key: "house_number",
  //   text: "House Number",
  //   TrOnlyClassName: 'tsc',
  //   className: "tsc",
  //   align: "left",
  // },
  // {
  //   key: "apartment_name",
  //   TrOnlyClassName: 'tsc',
  //   text: "Apartment Name",
  //   className: "tsc",
  // },

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
    const [usersResponse, complainResponse] = await Promise.all([
      axios.get(baseURL + 'users', {
        headers: {Authorization: `Bearer ` + TOKEN},
      }),
      axios.get(baseURL + 'roles', {
        headers: {Authorization: `Bearer ` + TOKEN},
      }),
      // axios.get(baseURL + "houses", { headers: { "Authorization": `Bearer ` + TOKEN } }),
      // axios.get(baseURL + "apartments", { headers: { "Authorization": `Bearer ` + TOKEN } }),
    ]);

    // alert(JSON.stringify(complainResponse.data));
    this.setState(
      {
        users: usersResponse.data,
        complian: complainResponse.data,

        // houses: houseResponse.data,
        // apartment: apartmentResponse.data,
        isLoading: false,
      },
      function () {
        console.log('teachers', complainResponse.data);
      }
    );
    /// var data = [];

    var data = [];
    var da = 0;

    for (let i = 0; i < (this.state.users.length || da); i++) {
      //  var user_role = this.state.users[i].role_id;
      // var user_id = this.state.users[i].id;

      var user_role = this.state.users[i].role_id;
      if (user_role == 3) {
        let index = {idx: i + 1};

        data.push(Object.assign(index, this.state.users[i]));
        this.setState({
          data: data,
        });
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
          <div className="panel-body">
            <div className="pull-right">
              <Link to="/user/users">
                <button className="btn btn-green">Add Caretaker</button>
              </Link>
            </div>
            <br />
            <br />
            <br />
            {this.state.isShowError ? (
              <div className="alert alert-success">
                {' '}
                {this.state.statusMessage}
              </div>
            ) : null}
            <ReactDatatable
              config={config}
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