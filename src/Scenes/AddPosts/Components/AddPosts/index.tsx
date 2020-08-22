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
  houses:any[],
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


class AddPosts extends React.Component<{}, ListingState> {
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
          name: 'House'
        },
        {
          name: 'Apartment'
        }],
    };


  }
  async componentDidMount() {
    const token = 'Bearer ' + TOKEN
    const [
      countiesResponse, constituencyResponse] = await Promise.all([
        // axios.get(baseURL + 'users/1', { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } }),
        axios.get(baseURL + "apartments", { headers: { "Authorization": token } }),
        axios.get(baseURL + 'houses', { headers: { "Authorization": token } }),


      ]);

    this.setState({
      counties: countiesResponse.data,
      constituency: constituencyResponse.data,
    },

      function () {
        console.log("bayo", constituencyResponse.data)
      }
    );

  }

  County() {
    return (this.state.counties && (this.state.counties.length == 0||this.state.counties.length) > 0 &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.apartment_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({
      county_id: value.value.toString()},
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
    this.setState({ constituency_id: value.value.toString() });
  };


  onSubmit(e) {
    e.preventDefault();
   
    this.setState({ isLoading: true });

    // data.append("image", this.state.csvfile);

    let formData = {

      "title": this.state.number_of_floors,
      "slug": this.state.number_of_carparking,
      "body": this.state.number_blocks,
      "apartment_id": this.state.county_id,
      "house_id": this.state.constituency_id,
      "property_type": "rent",
      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    // console.log("DATA", data);

    axios.post(baseURL + 'posts', formData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
    }).then((response) => {

      if (response.data.status) {
        this.setState({ statusMessage: response.data.status_message, alert_color: "alert alert-success",  isLoading: false, isShowError: true });
        console.log("bayo", response.data)
      } else {
        this.setState({ statusMessage: response.data.status_message, isLoading: false,alert_color: "alert alert-danger", isShowError: true });
      }

    }).catch((error) => {
      console.log('bayoo', error.response)
       this.setState({ statusMessage: error.response.data.statusMessage, isLoading: false,alert_color: "alert alert-danger", isShowError: true });
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
              <h4>Title</h4>
              <input type="text" required name="title" onChange={this.handleChangefloor} id="" className="form-control" />
            </div>
           
            <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Slug</h4>
              <input type="text" required name="slug" onChange={this.handleChangePark} id="" className="form-control" />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
                <h4>Body</h4>
              <input type="text"  required name="body" id="" onChange={this.handleChangeBlocl} className="form-control" />
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
            <div className=" text-center title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <button id="input" type="submit" className="btn btn-green btn-lg
                                                                 text-white margin-left: '10px'" style={{ fontFamily: 'Fira Sans', backgroundColor: '#0070BA' }}>
                {this.state.isLoading ? "Please Wait..." : "Post Now!"}  <i className="fa fa-refresh"></i>
              </button>
            </div>
          </>


          <br />

        </form>
      </div>
    );
  }
}

export default AddPosts;