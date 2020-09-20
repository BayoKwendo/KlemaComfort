import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import Select from 'react-select';

import "./csv.css";

type ListingState = {

  search: any,
  apartment_name: string,
  apartment_type: string,
  showComponent: boolean,
  hideComponent: boolean,
  number_of_floors: string,
  number_of_carparking: string,
  number_blocks: string,
  county_id: string,
  constituency_id: string,
  landLord_id: string,
  ward_id: string,
  statusMessage: string,
  alert_color: string,

  generator: string,
  lift: string,
  houses: any[],
  data: any[],
  Name: string,
  counties: any[],
  constituency: any[],
  wards: any[],
  landlord: any[],
  boolean: any[],
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  isShowError: boolean,
  hide1Component: boolean,
  csvfile: string

};


class AddLease extends React.Component<{}, ListingState> {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      apartment_name: '',
      apartment_type: '',
      number_of_floors: '',
      statusMessage: '',
      number_of_carparking: '',
      search: '',
      data: [],
      number_blocks: '',
      county_id: '',
      alert_color: "",
      showComponent: true,
      hideComponent: false,
      hide1Component: false,
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      generator: '',
      csvfile: '',
      lift: '',
      houses: [],
      isLoading: false,
      Name: '',
      counties: [],
      constituency: [],
      wards: [],
      landlord: [],
      selectedBolean: "",
      selectedBolean1: "",
      isShowError: false,
      boolean: [
        {
          name: 'YES'
        },
        {
          name: 'NO'
        }],
    };


  }
  async componentDidMount() {
    const token = 'Bearer ' + TOKEN
    const [
      countiesResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } })

      ]);

    this.setState({
      counties: countiesResponse.data,
    },

      function () {
        console.log("bayo", countiesResponse.data)
      }
    );

  }

  County() {
    return (this.state.counties && (this.state.counties.length == 0 || this.state.counties.length) > 0 &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.apartment_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({
      county_id: value.value.toString()
    },
      function () {
        fetch(baseURL + 'houses?apartment_id=' + value.value.toString(), { headers: { "Authorization": `Bearer ` + TOKEN } })
          .then(response => response.json())
          .then(
            res => {
              this.setState({ houses: res },
                console.log("bayd", res)
              )
            }
          )
      });
  };

  Constituency() {
    return (this.state.houses && (this.state.houses.length == 0 || this.state.houses.length > 0) &&
      this.state.houses.map((countyItem, i) =>
        ({ label: countyItem.house_number, value: countyItem.id })))

        
  }
  onSelectChangeConstitueny = value => {
    this.setState({ constituency_id: value.value.toString() },
      function () {
       
        axios.all([
          axios.get(baseURL + 'tenants?house_id=' + value.value.toString(), { headers: { "Authorization": `Bearer ` + TOKEN } }),
          axios.get(baseURL + "users?role_id=4&&limit=1000000", { headers: { "Authorization": `Bearer ` + TOKEN } }),
        ]).then(axios.spread((complainResponse, usersResponse) => {
          this.setState(
            {
              complian: complainResponse.data,
              users: usersResponse.data,
              isLoading: false
            },
            function () {
              var data = [];
              for (let i = 0; i < this.state.complian.length; i++) {
                //alert(this.state.users[i].id);
                for (let j = 0; j < this.state.users.length; j++) {
                  var house_id = this.state.complian[i].user_id;
                  //   var user_id = this.state.complian[i].user_id;
                  let index = { idx: i + 1 };
                  let id = { customer_id: this.state.complian[i].id };

                  let user_id = { userid: this.state.users[j].id };
                  // var house_id = this.state.houses[j].id;
                  if (house_id == this.state.users[j].id) {
                    data.push(Object.assign(index, this.state.complian[i],user_id, this.state.users[j], id))
                    this.setState({
                      data: data
                    })
                    console.log("EVANS", data);
                  }
                }
              }
            });
        }));
      }




    );
  };

  Landload() {
    return (this.state.data && (this.state.data.length > 0 || this.state.data.length == 0) &&
      this.state.data.map((countyItem, i) =>
        ({ label: countyItem.username, value: countyItem.userid })))
  }
  onSelectChangeLandLord = value => {
    this.setState({ landLord_id: value.value.toString() });
  };

  onSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    // data.append("image", this.state.csvfile);

    let formData = {


      "agreement": this.state.selectedBolean1,
      "lease_period": this.state.number_blocks,
      "customer_id": this.state.landLord_id,
      "apartment_id": this.state.county_id,
      "house_id": this.state.constituency_id,
      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    // console.log("DATA", data);

    axios.post(baseURL + 'leases', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
    }).then((response) => {

      if (response.data.status) {
        this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success", isLoading: false, isShowError: true });
        console.log("bayo", response.data)
        window.setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        this.setState({ statusMessage: response.data.status_message, isLoading: false, alert_color: "alert alert-danger", isShowError: true });
      }

    }).catch((error) => {
      console.log('bayoo', error.response)
      this.setState({ statusMessage: error.response.data.status_message, isLoading: false, alert_color: "alert alert-danger", isShowError: true });
    })

  }

  handleChangeBolean1 = (event) => {
    this.setState({ selectedBolean1: event.target.value },);

  };




  handleChangefloor = (e) => {
    this.setState({ number_of_floors: e.target.value });
  }
  handleChangePark = (e) => {
    this.setState({ number_of_carparking: e.target.value });
  }
  handleChangeBlocl = (e) => {
    this.setState({ number_blocks: e.target.value });
  }

  render() {

    return (
      <div className="newPropertyForm">
        {this.state.isShowError ? <div className={this.state.alert_color}
          style={{ fontSize: '15px' }}>
          {this.state.statusMessage}</div> : null}
        <form onSubmit={this.onSubmit}>
          <>

            <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Lease Period (In Months)</h4>
              <input type="number" required name="body" id="" onChange={this.handleChangeBlocl} className="form-control" />
            </div>



            <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Apartment</h4>
              <Select
                options={this.County()}
                onChange={this.onSelectChange}
                placeholder="Select Apartment"
                tabSelectsValue={false}
                className='drop'
              />
              <br />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>House</h4>

              <Select
                options={this.Constituency()}
                onChange={this.onSelectChangeConstitueny}
                placeholder="Select House"
                tabSelectsValue={false}
                className='drop'
              />
              <br />
            </div>
            <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Tenant</h4>
              <Select
                options={this.Landload()}
                onChange={this.onSelectChangeLandLord}
                placeholder="Select Tenent "
                tabSelectsValue={false}
                className='drop'
              />
              <br />
            </div>
            <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Agreement</h4>
              <select
                name="agreement"
                className="form-control"
                value={this.state.selectedBolean1}
                onChange={this.handleChangeBolean1}
                id="gender">
                {<option>Agreement</option>}

                {
                  this.state.boolean && this.state.boolean.length > 0
                  && this.state.boolean.map((genderItem, i) =>
                    <option key={i} value={genderItem.name}>{genderItem.name}</option>)
                }
              </select><br />
            </div>
            <div className=" text-center title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <button id="input" type="submit" className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'" >
                {this.state.isLoading ? "Please Wait..." : "Add Lease!"}  <i className="fa fa-refresh"></i>
              </button>
            </div>
          </>


          <br />

        </form>
      </div>
    );
  }
}

export default AddLease;