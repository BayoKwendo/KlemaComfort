import * as React from 'react';
import './style.css';
import axios from "axios";
import { baseURL } from 'Helpers/baseURL';
import Select from 'react-select';
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
  selectedBolean: string,
  selectedBolean1: string,
  isLoading: boolean,
  isShowError: boolean,
  house: any[]

};


class AddHouse extends React.Component<{}, ListingState> {
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
      alert_color: "",
      number_blocks: '',
      county_id: '',
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      generator: '',
      lift: '',
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
      house: [
        {
          name: 'bedsitter'
        },
        {
          name: 'single room'
        },
        {
          name: '1 bedroom'
        },
        {
          name: '2 bedroom'
        },
        {
          name: '3 bedroom'
        }, 
        {
          name: '4 bedroom'
        }],
    };


  }
  async componentDidMount() {
    const token = 'Bearer ' + TOKEN
    const [
      countiesResponse, constituencyResponse, wardsResponse, landlordResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'users?role_id=5', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'wards', { headers: { "Authorization": token } }),
        axios.get(baseURL + 'users?role_id=4', { headers: { "Authorization": token } }),

      ]);

    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
      wards: wardsResponse.data,
      landlord: landlordResponse.data,
    },

      function () {
        console.log("bayo", constituencyResponse.data)
      }
    );

  }



  County() {
    return (this.state.counties && (this.state.counties.length == 0 || this.state.counties.length > 0) &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.apartment_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({ county_id: value.value.toString() });
  };

  Ward() {
    return (this.state.wards && (this.state.wards.length == 0 || this.state.wards.length > 0)&&
      this.state.wards.map((countyItem, i) =>
        ({ label: countyItem.ward_name, value: countyItem.id })))
  }
  onSelectChangeWard = value => {
    this.setState({ ward_id: value.value.toString() });
  };


  Constituency() {
    return (this.state.constituency && (this.state.constituency.length == 0 || this.state.constituency.length > 0) &&
      this.state.constituency.map((countyItem, i) =>
        ({ label: countyItem.username, value: countyItem.id })))
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

      "house_number": this.state.apartment_name,
      "apartment_id": this.state.county_id,
      "house_size": this.state.number_of_floors,
      "house_type": this.state.number_of_carparking,
      "caretaker_id": this.state.constituency_id,
      "number_bathrooms": this.state.number_blocks,
      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    this.setState({ isLoading: true });

    const token = 'Bearer ' + TOKEN

    axios.post(baseURL + 'houses', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
    }).then((response) => {
         console.log("response", response.data)
        if (response.data.status) {
          this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success", isShowError: true, isLoading: false });
          window.setTimeout(function () {
            window.location.href= '/newproperty/billings';

          }, 1000);
        } else {
          this.setState({ statusMessage: response.data.status_message, isShowError: true, alert_color: "alert alert-danger", isLoading: false });
        }
      })
      .catch((error) => {
        console.log('bayoo', error.response)

        this.setState({ statusMessage: error.response.data.status_message, isShowError: true, alert_color: "alert alert-danger", isLoading: false });

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
  handleChangePark = (event) => {
    this.setState({ number_of_carparking: event.target.value });
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
          <div className="row form-group">
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4> House Number</h4>
              <input type="text" required name="apartment_name" onChange={this.handleChange} id="" className="form-control" />
            </div>
            <div className="Price col-xs-12 col-sm-6 col-md-6">
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
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>House Size</h4>
              <input type="text" required name="number_of_floors" onChange={this.handleChangefloor} id="" className="form-control" />
            </div>
            {/* <div className="Price col-xs-12 col-sm-6 col-md-6">
              <h4>House Type</h4>
              <input type="text" required name="number_of_carparking" onChange={this.handleChangePark} id="" className="form-control" />
            </div> */}
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>House Type</h4>

              <select
                name="number_of_carparking"
                className="form-control"
                onChange={this.handleChangePark}
                id="gender">
                {<option>House Type</option>}

                {
                  this.state.house && this.state.house.length > 0
                  && this.state.house.map((genderItem, i) =>
                    <option key={i} value={genderItem.name}>{genderItem.name}</option>)
                }
              </select>
            </div>
          <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Number of Bathrooms</h4>
              <input type="number" required name="number_blocks" id="" onChange={this.handleChangeBlocl} className="form-control" />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6">
              <h4>Caretaker</h4>

              <Select
                options={this.Constituency()}
                onChange={this.onSelectChangeConstitueny}
                placeholder="Select CareTaker"
                tabSelectsValue={false}
                className='drop'
              />
              <br />
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
    );
  }
}

export default AddHouse;