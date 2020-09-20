import * as React from 'react';
import './style.css';
import axios from "axios";
import Select from 'react-select';
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';

type ListingState = {

  search: any,
  apartment_name: string,
  apartment_type: string,
  number_of_floors: string,
  number_of_carparking: string,
  number_blocks: string,
  county_id: string,
  constituency_id: string,
  landLord_id: string,
  ward_id: string,
  mssdn: string,
  kra_pin: string,
  Name: string,
  counties: any[],
  alert_error: string
  data: any[];
  constituency: any[],
  wards: any[],
  landlord: any[],
  boolean: any[],
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  statusMessage: string,
  isShowError: boolean,
  password: string


};


class AddUser extends React.Component<{}, ListingState> {
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
      number_blocks: '',
      alert_error: '',

      county_id: '',
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      mssdn: '',
      password: '',

      data: [],
      kra_pin: '',
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
      countiesResponse, constituencyResponse, wardsResponse, landlordResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'constituencies', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'roles', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'users', { headers: { "Authorization": token } }),
      ]);
    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      wards: wardsResponse.data,
      landlord: landlordResponse.data,
    },
      function () {
        let data = []
        console.log("bayo", countiesResponse.data)
        for (let j = 0; j < this.state.wards.length; j++) {
          var role_id = this.state.wards[j].id;
       
          if (role_id == 3 || role_id == 5) {
            data.push(Object.assign(this.state.wards[j]))
            this.setState({
              data: data
            })
            console.log("EVANS", data);
          }
        }
      });

  }



  County() {
    return (this.state.counties && this.state.counties.length > 0 &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.apartment_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({ county_id: value.value.toString() });
  };

  Ward() {
    return (this.state.data && this.state.data.length > 0 &&
      this.state.data.map((countyItem, i) =>
        ({ label: countyItem.role_name, value: countyItem.id })))
  }
  onSelectChangeWard = value => {
    this.setState({ ward_id: value.value.toString() });
  };


  Constituency() {
    return (this.state.constituency && this.state.constituency.length > 0 &&
      this.state.constituency.map((countyItem, i) =>
        ({ label: countyItem.constituency_name, value: countyItem.id })))
  }
  onSelectChangeConstitueny = value => {
    this.setState({ constituency_id: value.value.toString() });
  };


  Landload() {
    return (this.state.landlord && this.state.landlord.length > 0 &&
      this.state.landlord.map((countyItem, i) =>
        ({ label: countyItem.username, value: countyItem.id })))
  }
  onSelectChangeLandLord = value => {
    this.setState({ landLord_id: value.value.toString() });
  };

  onSubmit(e) {
    e.preventDefault();

    let formData = {
      "first_name": this.state.apartment_name,
      "last_name": this.state.apartment_type,
      "email_address": this.state.number_of_floors,
      "username": this.state.number_of_carparking,
      "msisdn": this.state.mssdn,
      "id_number": this.state.number_blocks,
      "role_id": this.state.ward_id,
      "password": this.state.password,
      "kra_pin": this.state.kra_pin,

      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    this.setState({ isLoading: true });
    const token = 'Bearer ' + TOKEN

    axios.post(baseURL + 'users', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
      .then((response) => {

        if (response.data.status) {
          this.setState({ statusMessage: response.data.status_message, alert_error: "alert alert-success", isShowError: true, isLoading: false });
          window.setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {

          this.setState({ statusMessage: response.data.status_message, alert_error: "alert alert-danger", isShowError: true, isLoading: false });
        }
      })
      .catch((error) => {
        console.log('bayoo', error.response)

        this.setState({ statusMessage: error.response.data.status_message, alert_error: "alert alert-danger", isShowError: true, isLoading: false });

      })
  }

  handleChangeBolean = (event) => {
    this.setState({ selectedBolean: event.target.value });
  };
  handleChangeBolean1 = (event) => {
    this.setState({ selectedBolean1: event.target.value });
  };
  handleChange = (e) => {
    this.setState({ apartment_name: e.target.value });
  }
  handleChangetype = (e) => {
    this.setState({ apartment_type: e.target.value });
  }
  handleChangefloor = (e) => {
    this.setState({ number_of_floors: e.target.value });
  }
  handleChangePark = (e) => {
    this.setState({ number_of_carparking: e.target.value });
  }
  handleChangeBlocl = (e) => {
    this.setState({ number_blocks: e.target.value });
  }
  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  handleChangeMSSDN = (e) => {
    this.setState({ mssdn: e.target.value });
  }
  handleChangeKRA = (e) => {
    this.setState({ kra_pin: e.target.value });
  }

  render() {
    return (
      <div className="rentPropertyPage">
        <div className="dashboardTitle">
          <h3>Add Landlord/CareTaker</h3>

          <h5>Fill the below field to add Landlord/CareTaker</h5>
        </div>
        <div className="dashboardBody">
          <div className="newPropertyForm">
            {this.state.isShowError ? <div className={this.state.alert_error}
              style={{ fontSize: '15px' }}>
              {this.state.statusMessage}</div> : null}
            <form onSubmit={this.onSubmit}>
              <div className="row form-group">
                <div className="title col-xs-12 col-sm-6 col-md-6">
                  <h4>First Name</h4>
                  <input type="text" required name="apartment_name" onChange={this.handleChange} id="" className="form-control" />
                </div>
                <div className="Price col-xs-12 col-sm-6 col-md-6">
                  <h4>Last Name</h4>
                  <input type="text" required name="apartment_type" onChange={this.handleChangetype} id="" className="form-control" />
                </div>
                <div className="title col-xs-12 col-sm-6 col-md-6">
                  <h4>Email</h4>
                  <input type="email" required name="number_of_floors" onChange={this.handleChangefloor} id="" className="form-control" />
                </div>
                <div className="Price col-xs-12 col-sm-6 col-md-6">
                  <h4>Username</h4>
                  <input type="text" required name="number_of_carparking" onChange={this.handleChangePark} id="" className="form-control" />
                </div>
                <div className="title col-xs-12 col-sm-6 col-md-6">
                  <h4>ID No</h4>
                  <input type="number" required name="number_blocks" id="" onChange={this.handleChangeBlocl} className="form-control" />
                </div>
                <div className="title col-xs-12 col-sm-6 col-md-6">
                  <h4>KRA PIN</h4>
                  <input type="text" required name="kra_pin" id="" onChange={this.handleChangeKRA} className="form-control" />
                </div>
                <div className="Price col-xs-12 col-sm-6 col-md-6">
                  <h4>Phone No</h4>
                  <input type="phone" required name="mssdn" onChange={this.handleChangeMSSDN} id="" className="form-control" />
                </div>
                <div className="Price col-xs-12 col-sm-6 col-md-6">
                  <h4>Select User</h4>
                  <Select
                    options={this.Ward()}
                    onChange={this.onSelectChangeWard}
                    placeholder="Select User"
                    tabSelectsValue={false}
                    className='drop'
                  />
                  <br />
                </div>
                <div className="title col-xs-12 col-sm-6 col-md-6">
                  <h4>Password</h4>
                  <input type="text" required name="password" id="" onChange={this.handleChangePassword} className="form-control" />
                </div>

              </div>
              <br />

              <div className="row form-group rowBtn">
                <button id="input" type="submit" className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'">
                  {this.state.isLoading ? "Please Wait..." : "Submit"}  <i className="fa fa-refresh"></i>
                </button> &nbsp;&nbsp;&nbsp;

          </div>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default AddUser;