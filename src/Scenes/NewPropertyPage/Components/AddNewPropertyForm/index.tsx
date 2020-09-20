import * as React from 'react';
import './style.css';
import axios from "axios";
import Select from 'react-select';
import { baseURL } from 'Helpers/baseURL';
import { TOKEN } from 'Helpers/token';
import { isLoggedIn } from 'Helpers/isLoggedIn';

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
  statusMessage: string,
  generator: string,
  lift: string,
  Name: string,
  counties: any[],
  constituency: any[],
  wards: any[],
  landlord: any[],
  boolean: any[],
  alert_color: string,
  apartments: any [],
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  isShowError: boolean

};
class AddNewPropertyForm extends React.Component<{}, ListingState> {
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
      county_id: '',
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      generator: '',
      lift: '',
      isLoading: false,
      alert_color: "",
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
      apartments: [
        {
          name: 'commercial'
        },
        {
          name: 'residential'
        }],
    }; }
    
  async componentDidMount() {

    const token = 'Bearer ' + TOKEN
    const [
      countiesResponse, constituencyResponse, wardsResponse, landlordResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "counties", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'constituencies', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'wards', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'users?role_id=3', { headers: { "Authorization": token } }),

      ]);

    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      wards: wardsResponse.data,
      landlord: landlordResponse.data,
    },

      function () {
        console.log("landloard", landlordResponse.data)
      }
    );

  }



  County() {
    return (this.state.counties && this.state.counties.length > 0 &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.county_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({ county_id: value.value.toString() });
  };

  Ward() {
    return (this.state.wards && this.state.wards.length > 0 &&
      this.state.wards.map((countyItem, i) =>
        ({ label: countyItem.ward_name, value: countyItem.id })))
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
    return (this.state.landlord && (this.state.landlord.length == 0 || this.state.landlord.length > 0) &&
      this.state.landlord.map((countyItem, i) =>
        ({ label: countyItem.username, value: countyItem.id })))
  }
  onSelectChangeLandLord = value => {
    this.setState({ landLord_id: value.value.toString() });
  };

  onSubmit(e) {
    e.preventDefault();
    let formData = {

      "apartment_name": this.state.apartment_name,
      "apartment_type": this.state.apartment_type,
      "number_of_floors": this.state.number_of_floors,
      "number_of_carparking": this.state.number_of_carparking,
      "number_blocks": this.state.number_blocks,
      "county_id": this.state.county_id,
      "constituency_id": this.state.constituency_id,
      "ward_id": this.state.ward_id,
      "landLord_id": this.state.landLord_id,
      "generator": this.state.selectedBolean,
      "lift": this.state.selectedBolean1,
      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    this.setState({ isLoading: true });
    const token = 'Bearer ' + TOKEN

    axios.post(baseURL + 'apartments', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
      .then((response) => {

        if (response.data.status) {
          this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success", isShowError: true, isLoading: false });
          window.setTimeout(function () {
            window.location.reload();
          }, 2000);
        } else {

          this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-danger", isShowError: true, isLoading: false });
        }
      })
      .catch((error) => {
        console.log('bayoo', error.response)

        this.setState({ statusMessage: error.response.data.status_message, alert_color: "alert alert-danger", isShowError: true, isLoading: false });

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
  render() {
    if (isLoggedIn == "false") {

      alert("You have to login first")
      window.location.href = "/";
    }
    return (
      <div className="newPropertyForm">
        {this.state.isShowError ? <div className={this.state.alert_color}
          style={{ fontSize: '15px' }}>
          {this.state.statusMessage}</div> : null}
        <form onSubmit={this.onSubmit}>
          <div className="row form-group">
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Apartment Name</h4>
              <input type="text" required name="apartment_name" onChange={this.handleChange} id="" className="form-control" />
            </div>
            <div className="Price col-xs-12 col-sm-6 col-md-6">
              <h4>Apartment Type</h4>
              <select
                name="apartment_type"
                className="form-control"
                value={this.state.apartment_type}
                onChange={this.handleChangetype}
                id="gender">
                {<option>Apartment Type</option>}

                {
                  this.state.apartments && this.state.apartments.length > 0
                  && this.state.apartments.map((genderItem, i) =>
                    <option key={i} value={genderItem.name}>{genderItem.name}</option>)
                }
              </select>

            </div>
            {/* <div className="Price col-xs-12 col-sm-6 col-md-6">
              <h4></h4>
              <input type="text" required name="apartment_type" onChange={this.handleChangetype} id="" className="form-control" />
            </div> */}
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Number of Floor</h4>
              <input type="number" required name="number_of_floors" onChange={this.handleChangefloor} id="" className="form-control" />
            </div>
            <div className="Price col-xs-12 col-sm-6 col-md-6">
              <h4>Number of Car Parking</h4>
              <input type="number" required name="number_of_carparking" onChange={this.handleChangePark} id="" className="form-control" />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Number of Blocks</h4>
              <input type="number" required name="number_blocks" id="" onChange={this.handleChangeBlocl} className="form-control" />
            </div>
            <div className="Price col-xs-12 col-sm-6 col-md-6">
              <h4>County</h4>

              <Select
                options={this.County()}
                onChange={this.onSelectChange}
                placeholder="Select County"
                tabSelectsValue={false}
                className='drop'
              />
              <br />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Constituency</h4>

              <Select
                options={this.Constituency()}
                onChange={this.onSelectChangeConstitueny}
                placeholder="Select Constituency"
                tabSelectsValue={false}
                className='drop'
              />
              <br />
            </div>
            <div className="Price col-xs-12 col-sm-6 col-md-6">
              <h4>Ward</h4>
              <Select
                options={this.Ward()}
                onChange={this.onSelectChangeWard}
                placeholder="Select Ward"
                tabSelectsValue={false}
                className='drop'
              />
              <br />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Landlord</h4>

              <Select
                options={this.Landload()}
                onChange={this.onSelectChangeLandLord}
                placeholder="Select Landlord"
                tabSelectsValue={false}
                className='drop'
              />
              <br />

            </div>

            <div className="Price col-xs-12 col-sm-6 col-md-6">
              <h4>Generator</h4>
              <select
                name="generator"
                className="form-control"
                value={this.state.selectedBolean}
                onChange={this.handleChangeBolean}
                id="gender">
                {<option>Generator</option>}
                {
                  this.state.boolean && this.state.boolean.length > 0
                  && this.state.boolean.map((genderItem, i) =>
                    <option key={i} value={genderItem.name}>{genderItem.name}</option>)
                }
              </select>

            </div>
            <div className=" col-xs-12  col-md-6 col-md-offset-3">
              <h4>Lift</h4>
              <select
                name="lift"
                className="form-control"
                value={this.state.selectedBolean1}
                onChange={this.handleChangeBolean1}
                id="gender">
                {<option>Lift</option>}

                {
                  this.state.boolean && this.state.boolean.length > 0
                  && this.state.boolean.map((genderItem, i) =>
                    <option key={i} value={genderItem.name}>{genderItem.name}</option>)
                }
              </select>
            </div>
          </div>
          <br /><br/>

          <div className="row form-group rowBtn">
            <button id="input" type="submit" className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'">
              {this.state.isLoading ? "Please Wait..." : "Submit"}  <i className="fa fa-refresh"></i>
            </button> &nbsp;&nbsp;&nbsp;

          </div>
        </form>
      </div>
    );
  }
}

export default AddNewPropertyForm;