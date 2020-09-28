import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import ReactDatatable from '@ashvin27/react-datatable';
import * as moment from 'moment';
import Dashboard from 'Components/DashboardLayout';
import { Link } from 'react-router-dom';



const columns = [
  {
    key: "idx",
    text: "#",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },

  {
    key: "title",
    text: "First Name",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  }, {
    key: "slug",
    text: "Last Name",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "body",
    text: "ID Number",
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
    key: "dates",
    text: "Created At",
    TrOnlyClassName: 'tsc',
    className: "tsc",
    align: "left",
  },
  {
    key: "action",
    text: "Options",
    TrOnlyClassName: 'cell',
    className: "cell",
    width: 250,
    sortable: false,
    cell: record => {
      return (

        <button
          title="Delete details"
          className="btn btn-danger btn-sm"

          style={
            { marginRight: '10px' }}
          onClick={(e) => {
            if
              (window.confirm('Are you sure you wish to delete this post?')) this.deleteRecord(record)
          }}
        >
          <span className="fa fa-trash dt-icon-btn" > Delete </span>
        </button>
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

class PostsList extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isShowError: false,
      accountDats: [],
    };


  }

  async componentDidMount() {
    this.setState({
      ready: 'loading'
    });
    const [
      postResponse, apartmentResponse, billingResponse, houseResponse, billtypeResponse] = await Promise.all([
        axios.get(baseURL + 'posts', { headers: { "Authorization": `Bearer ` + TOKEN } }),
        axios.get(baseURL + 'apartments', { headers: { "Authorization": `Bearer ` + TOKEN } }),
        axios.get(baseURL + 'billings', { headers: { "Authorization": `Bearer ` + TOKEN } }),
        axios.get(baseURL + 'houses', { headers: { "Authorization": `Bearer ` + TOKEN } }),
        axios.get(baseURL + 'bill-types', { headers: { "Authorization": `Bearer ` + TOKEN } }),

      ]);

    this.setState({
      posts: postResponse.data,
      apartment: apartmentResponse.data,
      billings: billingResponse.data,
      houses: houseResponse.data,
      billtype: billtypeResponse.data,
      isLoading: false


    }, function () { });
    var data = [];
    for (let i = 0; i < this.state.posts.length; i++) {
      let index = { idx: i + 1 };
      var house_id = this.state.posts[i].house_id;
      for (let j = 0; j < this.state.houses.length; j++) {
        //   var user_id = this.state.complian[i].user_id;
        if (house_id == this.state.houses[j].id) {
          for (let l = 0; l < this.state.apartment.length; l++) {
            var apartment_id = this.state.houses[j].apartment_id;
            if (apartment_id == this.state.apartment[l].id) {
              if (apartment_id == this.state.apartment[l].id) {

                let date = { dates: moment(this.state.posts[i].created_at).format('DD MMM, YYYY HH:MM') };
                data.push(Object.assign(index, this.state.posts[i], this.state.apartment[l], this.state.houses[j], date))
                this.setState({
                  data: data
                })
                for (let m = 0; m < this.state.billings.length; m++) {
                  if (house_id == this.state.billings[m].house_id) {

                    var bill_type_id = this.state.billings[m].bill_type_id;

                    for (let n = 0; n < this.state.billtype.length; n++) {
                      if (bill_type_id == this.state.billtype[n].id) {



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
      <div className="infoPage">
        <Dashboard >
          <div className="infoWrapper">
            <div className="rentPropertyPage">
              <div className="dashboardTitle">
                <h3>Posts</h3>
              </div>
              <div className="dashboardBody">
                <div className="panel-body" >
                  <div className="pull-right">
                    <Link to="/posts"><button className="btn btn-green" >Add Post</button></Link>
                  </div>
                  <br /><br /><br /><br />
                  {this.state.isShowError ?
                    <div className="alert alert-success" > {this.state.statusMessage}
                    </div> : null
                  }

                  < ReactDatatable
                    config={config}
                    records={
                      this.state.data
                    }
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


export default PostsList;