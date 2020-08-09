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
  generator: string,
  lift: string,
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
      showComponent: true,
      hideComponent: false,
      hide1Component: false,
      constituency_id: '',
      landLord_id: '',
      ward_id: '',
      generator: '',
      csvfile: '',
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
    return (this.state.counties && this.state.counties.length > 0 &&
      this.state.counties.map((countyItem, i) =>
        ({ label: countyItem.apartment_name, value: countyItem.id })))
  }

  onSelectChange = (value: { value: { toString: () => any; }; }) => {
    this.setState({
      county_id: value.value.toString()
      // function () {
      //   fetch(baseURL + 'classes?branch_id=' + value.value.toString(), { headers: { "Authorization": `Bearer ${window.user.data.access_token}` } })
      //     .then(response => response.json())
      //     .then(
      //       res => {
      //         this.setState({ class: res },
      //           console.log("bayd", res)
      //         )
      //       }
      //     )
    });


  };

  Constituency() {
    return (this.state.constituency && this.state.constituency.length > 0 &&
      this.state.constituency.map((countyItem, i) =>
        ({ label: countyItem.house_number, value: countyItem.id })))
  }
  onSelectChangeConstitueny = value => {
    this.setState({ constituency_id: value.value.toString() });
  };


  onSubmit(e) {
    e.preventDefault();
    event.preventDefault();
    console.log("fileformat", this.state.csvfile)
    var data = new FormData();
    this.setState({ isLoading: true });

    // data.append("image", this.state.csvfile);

    let formData = {

      "title": this.state.number_of_floors,
      "slug": this.state.number_of_carparking,
      "body": this.state.number_blocks,
      "apartment_id": this.state.county_id,
      "image": this.state.csvfile
      // 'school_logo': "logo.png"
    }

    console.log("DATA", JSON.stringify(formData))
    // console.log("DATA", data);

    axios.post(baseURL + 'posts', data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + TOKEN
      },
    }).then((response) => {

      if (response.data.status) {
        this.setState({ statusMessage: response.data.status_message, isLoading: false, isShowError: true });
        console.log("bayo", response.data)
      } else {
        this.setState({ statusMessage: response.data.statusMessage, isLoading: false, isShowError: true });
      }

    }).catch((error) => {
      console.log('bayoo', error.response)
   //   this.setState({ statusMessage: response.data.status_message, isLoading: false, isShowError: true });
    })

  }

  handleChangeBolean1 = (event) => {
    this.setState({ selectedBolean1: event.target.value },);

    if (event.target.value == "House") {
      this.setState({ hideComponent: true, showComponent: true, hide1Component: false },);
    } else if (event.target.value == "Apartment") {
      this.setState({ hideComponent: false, showComponent: true, hide1Component: true },);
    } else {
      this.setState({ hideComponent: false, showComponent: true, hide1Component: false },);
    }
  };


  handleChangeCSV = event => {
    console.log("FETCHER", event.target.files);
    this.setState({
      csvfile: event.target.files[0]
    });
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
        {this.state.isShowError ? <div className="alert alert-success"
          style={{ fontSize: '15px' }}>
          {this.state.statusMessage}</div> : null}
        <form onSubmit={this.onSubmit}>


          <>
          
            <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Title</h4>
              <input type="text" required name="title" onChange={this.handleChangefloor} id="" className="form-control" />
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
            <div className="Price col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Slug</h4>
              <input type="text" required name="slug" onChange={this.handleChangePark} id="" className="form-control" />
            </div>
            <div className="title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <h4>Body</h4>
              <input type="text" required name="body" id="" onChange={this.handleChangeBlocl} className="form-control" />
            </div>

            <div className="wrapper text-center title col-xs-12 col-sm-6 col-md-6 col-md-offset-3">
              <div className="section1"><br />
                <div className="container">
                  <h2 style={{ marginBottom: '20px' }}>Import Image File!</h2>
                  <input
                    className="csv-input"
                    type="file"
                    name="file"
                    placeholder={null}
                    onChange={this.handleChangeCSV}
                  />
                  <p />

                </div>
              </div>
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